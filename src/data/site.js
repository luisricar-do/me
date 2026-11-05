export const site = {
  name: "Luis Ricardo Santos",
  tagline: "Desenvolvimento · Cloud · IA aplicada",
  role: "Gerente de Governança de TI e IA",
  company: "Tech for Humans",
  email: "eu@luisr.com.br",
  github: "https://github.com/luisricar-do",
  repo: "https://github.com/luisricar-do/me",
  linkedin: "https://linkedin.com/in/luisricar-do",
  url: "https://luisr.com.br",
}

/** Link de email com assunto pronto: quem escreve já chega triado. */
export function mailto(subject) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`
}

/** Os motivos pelos quais alguém me escreve, na ordem em que mais acontecem. */
export const contactIntents = [
  {
    id: "projeto",
    label: "Site ou sistema",
    hint: "Um site novo, um sistema sob medida, uma integração",
    subject: "Projeto: site ou sistema",
  },
  {
    id: "ia",
    label: "Consultoria de IA",
    hint: "Onde aplicar IA, agentes, automações, governança",
    subject: "Consultoria de IA",
  },
  {
    id: "palestra",
    label: "Palestra ou mentoria",
    hint: "Eventos, workshops, hackathons, bancas",
    subject: "Convite para palestra ou mentoria",
  },
  {
    id: "outro",
    label: "Outro assunto",
    hint: "Oportunidades, parcerias ou só uma dúvida",
    subject: "Contato pelo site",
  },
]
