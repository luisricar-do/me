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

export const about = {
  yearsAtCompany: yearsSince(START_AT_COMPANY),
  stack: [
    { area: "Governança", items: ["Governança de TI", "Segurança da informação", "LGPD", "DPO", "SDLC"] },
    { area: "IA", items: ["IA aplicada à engenharia", "LLMs", "Régua de autonomia"] },
    { area: "Cloud", items: ["AWS", "Azure"] },
    { area: "DevOps", items: ["CI/CD", "Microsserviços", "Observabilidade"] },
    { area: "Engenharia", items: ["React", "TypeScript", "Node.js", "PostgreSQL"] },
  ],
}
