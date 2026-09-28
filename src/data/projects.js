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
]
