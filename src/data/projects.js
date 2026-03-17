import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export const projects = [
  {
    id: "volei-cidadao",
    title: "Vôlei Cidadão",
    description: "Site do projeto Vôlei Cidadão.",
    tags: ["TypeScript"],
    href: "https://github.com/luisricar-do/volei-cidadao",
    date: "2026-03-11",
    dateFormatted: () => format(new Date("2026-03-11"), "MMMM yyyy", { locale: ptBR }),
  },
  {
    id: "codear",
    title: "Codear",
    description: "Iniciativa para cursos de programação do zero ao código. Cursos em markdown, slides em PDF e trilhas de aprendizado.",
    tags: ["JavaScript", "React", "Vite", "Education"],
    href: "https://codear.luisr.com.br",
    date: "2026-01-04",
    dateFormatted: () => format(new Date("2026-01-04"), "MMMM yyyy", { locale: ptBR }),
  },
  {
    id: "me",
    title: "Me",
    description: "Este portfólio. Single-page com React, Vite, Tailwind e Framer Motion — terminal no hero, timeline de projetos e tema escuro.",
    tags: ["React", "Vite", "Tailwind", "Framer Motion"],
    href: "https://github.com/luisricar-do/me",
    date: "2026-03-12",
    dateFormatted: () => format(new Date("2026-03-12"), "MMMM yyyy", { locale: ptBR }),
  },
  {
    id: "eduflow",
    title: "EduFlow",
    description: "Sistema low-code configurável para gestão de TCCs — submissão, avaliação e acompanhamento de projetos finais. TCC publicado na IEEE IISA 2025 (Grécia). 92,4% dos usuários relataram facilidade de uso e 94% destacaram sua utilidade.",
    tags: ["Low-code", "Education", "IEEE", "TCC"],
    href: "https://ieeexplore.ieee.org/document/11311235/",
    date: "2025-07-10",
    dateFormatted: () => format(new Date("2025-07-10"), "MMMM yyyy", { locale: ptBR }),
  },
]
