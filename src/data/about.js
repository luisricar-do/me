export const START_AT_COMPANY = new Date("2021-09-01T12:00:00")

function yearsSince(date) {
  const now = new Date()
  let years = now.getFullYear() - date.getFullYear()
  const beforeAnniversary =
    now.getMonth() < date.getMonth() ||
    (now.getMonth() === date.getMonth() && now.getDate() < date.getDate())
  if (beforeAnniversary) years -= 1
  return years
}

/** O que sustenta o discurso: trabalho feito, antes de qualquer palco. */
export const proof = [
  "Fundei a área de DevOps na Tech for Humans",
  "DPO desde 2024",
  "2 artigos no IEEE",
  "Mestrado em IA · UNIFEI",
]

export const about = {
  yearsAtCompany: yearsSince(START_AT_COMPANY),
  stack: [
    { area: "IA", items: ["IA aplicada à engenharia", "LLMs", "Agentes", "Régua de autonomia"] },
    { area: "DevOps", items: ["CI/CD", "Microsserviços", "Observabilidade"] },
    { area: "Cloud", items: ["AWS", "Azure"] },
    { area: "Engenharia", items: ["React", "TypeScript", "Node.js", "PostgreSQL"] },
    { area: "Governança", items: ["Governança de TI", "Segurança da informação", "LGPD", "DPO", "SDLC"] },
  ],
}
