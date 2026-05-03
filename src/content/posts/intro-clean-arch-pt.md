---
title: "Transformando sua arquitetura com Clean Architecture"
description: "Uma visão prática sobre Clean Architecture, seus benefícios, desafios e como aplicá-la no mundo real."
date: 2026-05-03
lang: "pt"
draft: false
---

# Disclaimer
Este post é uma versão em texto da apresentação feita por mim durante o DevDay 2017, na cidade de Belo Horizonte, Minas Gerais, Brasil. O conteúdo original pode ser assistido em Português no link abaixo:

<figure class="video-card">
  <a href="https://www.youtube.com/watch?v=Nsjsiz2A9mg" target="_blank" rel="noopener noreferrer">
    <img src="https://img.youtube.com/vi/Nsjsiz2A9mg/hqdefault.jpg" alt="Palestra: Transformando sua arquitetura com Clean Architecture" />
  </a>
  <figcaption>Palestra: Transformando sua arquitetura com Clean Architecture</figcaption>
</figure>

# Introdução

“Como é a arquitetura do sistema que você trabalha?”

Muitas vezes, a resposta vem em forma de tecnologias:

> “Ah, é um sistema em Go com Postgres, roda em Docker…”

Mas isso não é arquitetura.

Arquitetura não é sobre **stack tecnológica**.  
É sobre **como organizamos o sistema**.

<div class="section-divider" aria-hidden="true">
  <span class="section-divider-line"></span>
  <span class="section-divider-core"></span>
  <span class="section-divider-line"></span>
</div>

# O que é arquitetura, afinal?

Arquitetura está ligada à **organização de um sistema e seus elementos**.

Um paralelo simples:

- Você olha um hospital ou shopping e entende sua estrutura sem entrar.
- Existe organização, propósito, separação.

Agora compare com muitos projetos de software:

> Por que não conseguimos entender um sistema só olhando sua estrutura?

<div class="section-divider" aria-hidden="true">
  <span class="section-divider-line"></span>
  <span class="section-divider-core"></span>
  <span class="section-divider-line"></span>
</div>

# Clean Architecture (a ideia central)

A proposta é simples:

> **Colocar as regras de negócio no centro, isoladas do resto.**

Princípios:

- Regras de negócio não conhecem frameworks
- Dependências apontam para dentro
- Infra depende do domínio, não o contrário
- Código de negócio é testável e independente

<div class="section-divider" aria-hidden="true">
  <span class="section-divider-line"></span>
  <span class="section-divider-core"></span>
  <span class="section-divider-line"></span>
</div>

## Camadas (visão mental)

- **Domain (Entities)** → regras puras  
- **Use Cases** → orquestração  
- **Adapters** → tradução de dados  
- **Infra** → banco, APIs, frameworks  

> A regra: dependências sempre apontam para dentro.

<div class="section-divider" aria-hidden="true">
  <span class="section-divider-line"></span>
  <span class="section-divider-core"></span>
  <span class="section-divider-line"></span>
</div>

### “Mas como eu salvo dados então?”

Com interfaces.

O domínio define **o que precisa**, e a infra define **como fazer**.

<div class="section-divider" aria-hidden="true">
  <span class="section-divider-line"></span>
  <span class="section-divider-core"></span>
  <span class="section-divider-line"></span>
</div>

### Exemplo (Python)

### Domínio / Use Case

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

<div class="section-divider" aria-hidden="true">
  <span class="section-divider-line"></span>
  <span class="section-divider-core"></span>
  <span class="section-divider-line"></span>
</div>

### Repare:

O use case depende de uma interface
Não sabe nada sobre banco, ORM, etc.

#### Infra (implementação real)
```python
class PostgresUserRepository(UserRepository):
    def save(self, user):
        print("Saving to Postgres:", user)
```

#### Wiring (composition root)
```python
repo = PostgresUserRepository()
usecase = CreateUser(repo)

usecase.execute("Henrique")
```

<div class="section-divider" aria-hidden="true">
  <span class="section-divider-line"></span>
  <span class="section-divider-core"></span>
  <span class="section-divider-line"></span>
</div>

### O ponto importante

Nos dois exemplos:

O domínio não depende de nada externo
A infra depende do domínio
Trocar banco não afeta o use case
Representando isso em código

Uma estrutura comum:

```
/domain
/usecases
/adapters
/infra
```

O nome pouco importa.

O que importa é a direção das dependências.

<div class="section-divider" aria-hidden="true">
  <span class="section-divider-line"></span>
  <span class="section-divider-core"></span>
  <span class="section-divider-line"></span>
</div>

### “Mas isso já não existia?”

Sim.

Ideias como separação de responsabilidades já existiam em UML e outros modelos.

*Clean Architecture só organiza melhor essas práticas.*

- Resultados na prática
- Código mais previsível
- Regras isoladas
- Menos acoplamento
- Maior clareza

<div class="section-divider" aria-hidden="true">
  <span class="section-divider-line"></span>
  <span class="section-divider-core"></span>
  <span class="section-divider-line"></span>
</div>

## Em resumo: Clean Architecture não faz milagre

Ela cria o ambiente certo.

Principal ganho: testabilidade

### Teste de use case (Python)

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

Sem banco. Sem framework. Rápido.

<div class="section-divider" aria-hidden="true">
  <span class="section-divider-line"></span>
  <span class="section-divider-core"></span>
  <span class="section-divider-line"></span>
</div>

### Desafios e trade-offs
#### 1. Menos DRY (de propósito)

Código pode se repetir entre camadas.

Clean prioriza desacoplamento sobre reutilização.

#### 2. Curva de aprendizado

Pergunta comum no começo:

“Onde esse código deveria estar?”

Resolve com prática e code review.

#### 3. Nem tudo fica “clean”

Na prática, concessões acontecem.

E tudo bem.

<div class="section-divider" aria-hidden="true">
  <span class="section-divider-line"></span>
  <span class="section-divider-core"></span>
  <span class="section-divider-line"></span>
</div>

### Saindo da teoria, indo para um caso prático
Essa palestra/post foi dada após meu time usar de clean durante um processo de transformação digital de uma grande e-commerce brasileiro, onde o sistema sofria com problemas em produção e a falta mantenabilidade do mesmo. Após um acordo com o cliente, resolvemos reescrever o mesmo de forma iterativa, mas usando de clean arch para nos ajudar. Era a primeira vez do cliente vendo clean arch. Os números abaixo foram os números do momento da apresentação, quando tanto o cliente quanto todo o time interno já tinham compreendido o valor do que estava ocorrendo.

Antes de iniciar o refactor do sistema para usar Clean Arch:
- Número de linhas de código: 13k
- Número de testes: 320
- Cobertura dos tests: 64%

No momento da apresentação (refactor ainda não finalizado)
- Número de linhas de código: 3.7k
- Número de testes: 393
- Cobertura dos tests: 100%

<div class="section-divider" aria-hidden="true">
  <span class="section-divider-line"></span>
  <span class="section-divider-core"></span>
  <span class="section-divider-line"></span>
</div>

## Conclusão

Clean Architecture não é bala de prata.

Mas muda o foco:

de tecnologia → para organização
de framework → para regras de negócio

No fim:

Arquitetura boa é a que te permite evoluir o sistema com segurança.

<div class="section-divider" aria-hidden="true">
  <span class="section-divider-line"></span>
  <span class="section-divider-core"></span>
  <span class="section-divider-line"></span>
</div>

## Referências

https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html

https://martinfowler.com/articles/microservice-testing/

https://www.youtube.com/watch?v=Nsjsiz2A9mg

https://blog.cleancoder.com/uncle-bob/2016/01/04/ALittleArchitecture.html
