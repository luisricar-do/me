export const site = {
  name: "Luis Ricardo Santos",
  tagline: "IA aplicada à engenharia · DevOps · Governança",
  role: "Gerente de Governança de TI e IA",
  company: "Tech for Humans",
  email: "eu@luisr.com.br",
  github: "https://github.com/luisricar-do",
  repo: "https://github.com/luisricar-do/me",
  linkedin: "https://linkedin.com/in/luisricar-do",
  substack: "https://substack.com/@luisricar",
  url: "https://luisr.com.br",
}

/** Link de email com assunto pronto: quem escreve já chega triado. */
export function mailto(subject) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`
}

/** Os motivos pelos quais alguém me escreve, do trabalho técnico para o resto. */
export const contactIntents = [
  {
    id: "engenharia",
    label: "IA na engenharia",
    hint: "Fluxo de dev, operação, automação e governança",
    subject: "Conversa sobre IA na engenharia",
  },
  {
    id: "oportunidade",
    label: "Oportunidade ou parceria",
    hint: "Projetos, cargos e colaborações",
    subject: "Oportunidade",
  },
  {
    id: "palestra",
    label: "Palestra, mentoria ou banca",
    hint: "Eventos, hackathons e iniciação científica",
    subject: "Convite para palestra",
  },
]
