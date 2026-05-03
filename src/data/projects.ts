export type Project = {
  title: {
    en: string;
    pt: string;
  };
  period: {
    en: string;
    pt: string;
  };
  summary: {
    en: string;
    pt: string;
  };
  highlights: {
    en: string[];
    pt: string[];
  };
  link?: string;
};

export const projects: Project[] = [
  {
    title: {
      en: "Game Backend & Live Systems",
      pt: "Backend de Jogos e Sistemas Live"
    },
    period: {
      en: "Recent years",
      pt: "Nos ultimos anos"
    },
    summary: {
      en: "Backend work shaped around game operations, iteration speed, and dependable player-facing services.",
      pt: "Trabalho de backend voltado para operacao de jogos, velocidade de iteracao e servicos confiaveis para o jogador."
    },
    highlights: {
      en: [
        "Designed services with product impact in mind, not only infrastructure concerns.",
        "Balanced maintainability, observability, and delivery speed for evolving game needs."
      ],
      pt: [
        "Desenho de servicos com foco em impacto no produto, nao apenas em infraestrutura.",
        "Equilibrio entre manutenibilidade, observabilidade e velocidade de entrega para jogos em evolucao."
      ]
    },
  },
  {
    title: {
      en: "Clean Architecture Advocacy",
      pt: "Advocacia por Arquitetura Limpa"
    },
    period: {
      en: "Talks & engineering leadership",
      pt: "Palestras e lideranca tecnica"
    },
    summary: {
      en: "A recurring theme in my work is using architecture to help teams move faster with less friction.",
      pt: "Um tema recorrente no meu trabalho e usar arquitetura para ajudar times a evoluir com menos atrito."
    },
    highlights: {
      en: [
        "Applied architectural thinking to large codebases and multi-team environments.",
        "Shared lessons publicly through talks and technical writing."
      ],
      pt: [
        "Aplicacao de pensamento arquitetural em codebases grandes e ambientes com varios times.",
        "Compartilhamento de aprendizados em palestras e conteudo tecnico."
      ]
    }
  },
  {
    title: {
      en: "Unity Game Development & Specialization",
      pt: "Desenvolvimento de Jogos com Unity e Especializacao em Jogos"
    },
    period: {
      en: "Ongoing",
      pt: "Em andamento"
    },
    summary: {
      en: "Beyond backend engineering, I keep investing in game development as a long-term craft.",
      pt: "Alem do backend, sigo investindo em desenvolvimento de jogos como um oficio de longo prazo."
    },
    highlights: {
      en: [
        "Expanded perspective through formal game development specialization.",
        "Interested in the bridge between engineering discipline and creative production."
      ],
      pt: [
        "Ampliacao de repertorio por meio de especializacao formal em desenvolvimento de jogos.",
        "Interesse especial na ponte entre disciplina de engenharia e producao criativa."
      ]
    }
  }
];
