/**
 * Case do EduFlow. Os campos `screenshots` e `learnings` só aparecem na
 * página quando preenchidos — dá para crescer sem mexer no componente.
 */
export const eduflow = {
  title: "EduFlow",
  tagline: "Gestão de TCC em low-code, publicada no IEEE",
  paperHref: "https://ieeexplore.ieee.org/document/11311235/",
  venue: "IEEE · IISA 2025",
  venueFull:
    "International Symposium on INnovations in Intelligent SysTems and Applications",
  place: "Atenas, Grécia",
  institution: "UNIFEI · Sistemas de Informação",
  stack: ["React", "Node.js", "Low-code"],
  metrics: [
    { value: "92,4%", label: "dos usuários relataram facilidade de uso" },
    { value: "94%", label: "destacaram a utilidade percebida" },
    { value: "IEEE", label: "publicado e apresentado em Atenas" },
  ],
  sections: [
    {
      id: "contexto",
      eyebrow: "Contexto",
      title: "Um TCC sobre a gestão de TCCs.",
      body: [
        "O EduFlow nasceu como meu Trabalho de Conclusão de Curso em Sistemas de Informação na UNIFEI: um sistema configurável, em low-code, para conduzir o ciclo de vida de trabalhos de conclusão — da submissão à avaliação em múltiplas etapas, com acompanhamento do progresso de cada projeto.",
      ],
    },
    {
      id: "problema",
      eyebrow: "Problema",
      title: "Fluxo rígido não sobrevive à realidade acadêmica.",
      body: [
        "Processo de TCC varia por curso, por departamento e por ano: muda o número de etapas, muda quem avalia, muda o critério que pesa e muda o prazo que vale.",
        "Ferramenta que codifica um fluxo específico envelhece no primeiro semestre seguinte. É por isso que o processo costuma terminar em planilha, e-mail e formulário solto.",
      ],
    },
    {
      id: "abordagem",
      eyebrow: "Abordagem",
      title: "O fluxo virou dado, não código.",
      body: [
        "Em vez de programar um processo, o EduFlow deixa o processo ser configurado: etapas, avaliadores, critérios e prazos são configuração, não implementação.",
        "Quem coordena o curso monta o próprio fluxo sem precisar de um desenvolvedor no meio — e é isso que faz o sistema atravessar mudanças de regulamento sem reescrita.",
      ],
    },
    {
      id: "resultado",
      eyebrow: "Resultado",
      title: "Avaliado com usuários, aprovado por revisão por pares.",
      body: [
        "Na avaliação com usuários, 92,4% relataram facilidade de uso e 94% destacaram a utilidade percebida.",
        "O trabalho foi aceito no International Symposium on INnovations in Intelligent SysTems and Applications (IISA) 2025 e publicado no IEEE, com apresentação em Atenas.",
      ],
    },
  ],
  screenshots: [],
  learnings: [],
}
