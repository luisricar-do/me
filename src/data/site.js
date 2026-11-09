export const site = {
  name: "Luis Ricardo Santos",
  tagline: "Governança · Engenharia · IA",
  title: "Luis Ricardo Santos | Governança de TI e IA que roda",
  description:
    "Luis Ricardo Santos é Gerente de Governança de TI e IA e DPO na Tech for Humans. Transforma burocracia em ferramenta e processo que rodam, com IA quando ela ajuda.",
  role: "Gerente de Governança de TI e IA",
  company: "Tech for Humans",
  email: "eu@luisr.com.br",
  github: "https://github.com/luisricar-do",
  repo: "https://github.com/luisricar-do/me",
  linkedin: "https://linkedin.com/in/luisricar-do",
  substack: "https://obigrick.substack.com",
  url: "https://luisr.com.br",
}

/** Link de email com assunto pronto: quem escreve já chega triado. */
export function mailto(subject) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`
}

/** Assunto do botão principal: a conversa que eu mais quero ter. */
export const primarySubject = "Conversa sobre governança e IA"

/** Os motivos pelos quais alguém me escreve. */
export const contactIntents = [
  {
    id: "governanca",
    label: "Governança e IA",
    hint: "LGPD, ISO, processos e onde a IA entra",
    subject: primarySubject,
  },
  {
    id: "palestra",
    label: "Palestra ou mentoria",
    hint: "Eventos, workshops, hackathons, bancas",
    subject: "Convite para palestra ou mentoria",
  },
  {
    id: "oportunidade",
    label: "Oportunidade",
    hint: "Liderança técnica, parcerias e projetos",
    subject: "Oportunidade",
  },
  {
    id: "outro",
    label: "Outro assunto",
    hint: "Ou só uma dúvida",
    subject: "Contato pelo site",
  },
]
