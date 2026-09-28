export const site = {
  name: "Luis Ricardo Santos",
  tagline: "Governança de TI e IA · Engenharia · Palestras",
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
    id: "palestra",
    label: "Palestra ou workshop",
    hint: "IA na engenharia, governança, carreira em tech",
    subject: "Convite para palestra",
  },
  {
    id: "mentoria",
    label: "Mentoria, banca ou avaliação",
    hint: "Hackathons, startups, iniciação científica",
    subject: "Convite para mentoria",
  },
  {
    id: "oportunidade",
    label: "Oportunidade ou parceria",
    hint: "Projetos, cargos e colaborações",
    subject: "Oportunidade",
  },
]
