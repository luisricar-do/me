const START_AT_COMPANY = new Date("2021-09-01T12:00:00")

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
    { area: "Frontend", items: ["React", "TypeScript"] },
    { area: "Backend", items: ["Node.js", "PostgreSQL", "MongoDB", "Redis"] },
    { area: "Cloud", items: ["AWS", "Azure", "Azure SignalR"] },
    { area: "DevOps", items: ["CI/CD", "Microsserviços", "Observabilidade"] },
    { area: "IA", items: ["IA aplicada", "Mestrado em andamento"] },
    { area: "Governança", items: ["DPO", "LGPD", "SDLC"] },
  ],
}
