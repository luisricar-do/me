const monthYear = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" })

export const projects = [
  {
    id: "volei-cidadao",
    title: "Vôlei Cidadão",
    description: "Site do projeto Vôlei Cidadão.",
    tags: ["TypeScript"],
    href: "https://github.com/luisricar-do/volei-cidadao",
    date: "2026-03-11",
    dateFormatted: () => monthYear.format(new Date("2026-03-11T12:00:00")),
  },
  {
    id: "codear",
    title: "Codear",
    description:
      "Aulas de programação do zero ao código, com trilhas em markdown e materiais de apoio. Lecionei presencialmente em uma escola da minha cidade, para alunos de 12 a 17 anos. Em pausa.",
    tags: ["JavaScript", "React", "Vite", "Education"],
    href: "https://codear.luisr.com.br/",
    date: "2026-01-04",
    dateFormatted: () => monthYear.format(new Date("2026-01-04T12:00:00")),
  },
  {
    id: "me",
    title: "Me",
    description: "Este portfólio. Single-page com React, Vite, Tailwind e Framer Motion: terminal no hero, timeline de projetos e tema claro/escuro.",
    tags: ["React", "Vite", "Tailwind", "Framer Motion"],
    href: "https://github.com/luisricar-do/me",
    date: "2026-03-12",
    dateFormatted: () => monthYear.format(new Date("2026-03-12T12:00:00")),
  },
  {
    id: "eduflow",
    title: "EduFlow",
    description: "Sistema low-code configurável para gestão de TCCs: submissão, avaliação e acompanhamento de projetos finais. TCC publicado na IEEE IISA 2025 (Grécia). 92,4% dos usuários relataram facilidade de uso e 94% destacaram sua utilidade.",
    tags: ["Low-code", "Education", "IEEE", "TCC"],
    href: "https://ieeexplore.ieee.org/document/11311235/",
    date: "2025-07-10",
    dateFormatted: () => monthYear.format(new Date("2025-07-10T12:00:00")),
  },
]
