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
    description: "Plataforma de cursos de programação do zero ao código. Cursos em markdown, slides em PDF e trilhas de aprendizado.",
    tags: ["JavaScript", "React", "Vite", "Education"],
    href: "https://github.com/luisricar-do/codear",
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
    id: "streamline",
    title: "Streamline",
    description: "Sistema configurável via low code, desenvolvido para otimizar a gestão e acompanhamento de atividades. Projeto da tech4humans-brasil.",
    tags: ["TypeScript", "Low code"],
    href: "https://github.com/tech4humans-brasil/streamline",
    date: "2024-11-02",
    dateFormatted: () => format(new Date("2024-11-02"), "MMMM yyyy", { locale: ptBR }),
  },
]
