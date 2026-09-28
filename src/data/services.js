import { Mic, ShieldCheck, Users } from "lucide-react"

/**
 * O que alguém pode me chamar para fazer. Cada bloco aponta para a prova
 * que já está no site e para o email com o assunto certo.
 */
export const services = [
  {
    id: "palestras",
    icon: Mic,
    title: "Palestras e workshops",
    body: "IA na engenharia sem hype: onde ela acelera, onde não deve entrar e como decidir antes que a decisão vire incidente.",
    proof: "HackTown 2026 · JobShop UNIFEI 2026",
    subject: "Convite para palestra",
  },
  {
    id: "governanca",
    icon: ShieldCheck,
    title: "Governança de TI e IA",
    body: "Segurança da informação, LGPD e políticas de uso de IA desenhadas junto com o produto, não coladas no fim como checklist.",
    proof: "DPO e gestor de governança na Tech for Humans",
    subject: "Conversa sobre governança de IA",
  },
  {
    id: "mentoria",
    icon: Users,
    title: "Mentoria e avaliação",
    body: "Times de hackathon, startups em fase inicial e trabalhos de iniciação científica, com olhar de quem já esteve do outro lado.",
    proof: "NASA Space Apps · Startup Weekend · SIC UNIFEI",
    subject: "Convite para mentoria",
  },
]
