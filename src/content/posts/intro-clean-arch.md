---
title: "Transforming Your Architecture with Clean Architecture"
description: "A practical view on Clean Architecture, its benefits, challenges, and how to apply it in the real world."
date: 2026-05-03
lang: "en"
draft: false
tags: ["clean architecture", "architecture", "software"]
---

# Disclaimer
This post is a text version of the presentation I gave at DevDay 2017 in Belo Horizonte, Minas Gerais, Brazil. The original content can be watched in Portuguese at: https://www.infoq.com/br/presentations/transformando-sua-arquitetura-com-clean-architecture/#downloadPdf/

<figure class="video-card">
  <a href="https://www.youtube.com/watch?v=Nsjsiz2A9mg" target="_blank" rel="noopener noreferrer">
    <img src="https://img.youtube.com/vi/Nsjsiz2A9mg/hqdefault.jpg" alt="Talk: Transforming Your Architecture with Clean Architecture" />
  </a>
  <figcaption>Talk: Transforming Your Architecture with Clean Architecture</figcaption>
</figure>

# Introduction

“What does the architecture of your system look like?”

Most of the time, the answer comes as a technology list:

> “Oh, it’s a Go system with Postgres, running in Docker…”

That is not architecture.

Architecture is not about **technology stack**.
It is about **how we organize the system**.

<div class="section-divider" aria-hidden="true">
  <span class="section-divider-line"></span>
  <span class="section-divider-core"></span>
  <span class="section-divider-line"></span>
</div>

# So what is architecture, really?

Architecture is about **organizing a system and its elements**.

A simple analogy:

- You look at a hospital or a shopping mall and understand its structure without entering.
- There is organization, purpose, separation.

Now compare that with many software projects:

> Why can’t we understand a system just by looking at its structure?

<div class="section-divider" aria-hidden="true">
  <span class="section-divider-line"></span>
  <span class="section-divider-core"></span>
  <span class="section-divider-line"></span>
</div>

# Clean Architecture (the core idea)

The proposal is simple:

> **Put business rules at the center, isolated from the rest.**

Principles:

- Business rules do not know frameworks
- Dependencies point inward
- Infra depends on domain, not the other way around
- Business code is testable and independent

<div class="section-divider" aria-hidden="true">
  <span class="section-divider-line"></span>
  <span class="section-divider-core"></span>
  <span class="section-divider-line"></span>
</div>

## Layers (mental model)

- **Domain (Entities)** → pure rules
- **Use Cases** → orchestration
- **Adapters** → data translation
- **Infra** → database, APIs, frameworks

> The rule: dependencies always point inward.

<div class="section-divider" aria-hidden="true">
  <span class="section-divider-line"></span>
  <span class="section-divider-core"></span>
  <span class="section-divider-line"></span>
</div>

### “But how do I save data then?”

With interfaces.

The domain defines **what it needs**, and infra defines **how to do it**.

<div class="section-divider" aria-hidden="true">
  <span class="section-divider-line"></span>
  <span class="section-divider-core"></span>
  <span class="section-divider-line"></span>
</div>

### Example (Python)

### Domain / Use Case

```python
from abc import ABC, abstractmethod

class UserRepository(ABC):
    @abstractmethod
    def save(self, user):
        pass


class CreateUser:
    def __init__(self, repo: UserRepository):
        self.repo = repo

    def execute(self, name: str):
        user = {"name": name}
        self.repo.save(user)
        return user
```

### Notice:

The use case depends on an interface
It knows nothing about the database, ORM, etc.

#### Infra (real implementation)
```python
class PostgresUserRepository(UserRepository):
    def save(self, user):
        print("Saving to Postgres:", user)
```

<div class="section-divider" aria-hidden="true">
  <span class="section-divider-line"></span>
  <span class="section-divider-core"></span>
  <span class="section-divider-line"></span>
</div>

#### Wiring (composition root)
```python
repo = PostgresUserRepository()
usecase = CreateUser(repo)

usecase.execute("Henrique")
```

### The important point

In both examples:

The domain depends on nothing external
Infra depends on domain
Swapping the database does not affect the use case

A common structure:

```
/domain
/usecases
/adapters
/infra
```

The name is not the point.

What matters is the direction of dependencies.

<div class="section-divider" aria-hidden="true">
  <span class="section-divider-line"></span>
  <span class="section-divider-core"></span>
  <span class="section-divider-line"></span>
</div>

### “But wasn’t this already a thing?”

Yes.

Ideas like separation of concerns already existed in UML and other models.

*Clean Architecture just organizes those practices better.*

- Practical results
- More predictable code
- Isolated rules
- Less coupling
- Greater clarity

## In summary: Clean Architecture is not a silver bullet

It creates the right environment.

The main gain: testability

### Use case test (Python)

```python
class FakeRepo(UserRepository):
    def __init__(self):
        self.saved = []

    def save(self, user):
        self.saved.append(user)


def test_create_user():
    repo = FakeRepo()
    usecase = CreateUser(repo)

    user = usecase.execute("Henrique")

    assert user["name"] == "Henrique"
    assert len(repo.saved) == 1
```

No database. No framework. Fast.

<div class="section-divider" aria-hidden="true">
  <span class="section-divider-line"></span>
  <span class="section-divider-core"></span>
  <span class="section-divider-line"></span>
</div>

### Challenges and trade-offs

#### 1. Less DRY (by design)

Code can repeat between layers.

Clean prioritizes decoupling over reuse.

#### 2. Learning curve

Common early question:

“Where should this code live?”

You solve it with practice and code review.

#### 3. Not everything stays “clean”

In practice, concessions happen.

And that is okay.

<div class="section-divider" aria-hidden="true">
  <span class="section-divider-line"></span>
  <span class="section-divider-core"></span>
  <span class="section-divider-line"></span>
</div>

### Moving from theory to a practical case
This talk/post was given after my team used Clean Architecture during a digital transformation process at a major Brazilian e-commerce company, where the system suffered from production issues and poor maintainability. After agreement with the client, we rewrote the system iteratively, using Clean Architecture as our guide. It was the first time the client had seen Clean Architecture. The numbers below were those at the time of the presentation, when both the client and the internal team already understood the value of what was happening.

Before starting the refactor to Clean Architecture:
- Lines of code: 13k
- Tests: 320
- Test coverage: 64%

At the time of the presentation (refactor still in progress):
- Lines of code: 3.7k
- Tests: 393
- Test coverage: 100%

<div class="section-divider" aria-hidden="true">
  <span class="section-divider-line"></span>
  <span class="section-divider-core"></span>
  <span class="section-divider-line"></span>
</div>

## Conclusion

Clean Architecture is not a silver bullet.

But it shifts the focus:

from technology → to organization
from framework → to business rules

In the end:

Good architecture is the one that lets you evolve the system safely.

<div class="section-divider" aria-hidden="true">
  <span class="section-divider-line"></span>
  <span class="section-divider-core"></span>
  <span class="section-divider-line"></span>
</div>

## References

https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html

https://martinfowler.com/articles/microservice-testing/

https://www.youtube.com/watch?v=Nsjsiz2A9mg

https://blog.cleancoder.com/uncle-bob/2016/01/04/ALittleArchitecture.html
