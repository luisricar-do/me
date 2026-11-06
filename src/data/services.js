import { Code2, Mic, ServerCog, Sparkles } from "lucide-react"

/**
 * O que alguém pode me chamar para fazer. Cada bloco aponta para a prova
 * que já está no site e para o email com o assunto certo.
 */
export const services = [
  {
    id: "desenvolvimento",
    icon: Code2,
    title: "Sites e sistemas",
    body: "Do site institucional ao sistema com login, banco de dados e integrações. Faço o front, o back e a infraestrutura, e entrego no ar.",
    proof: "Streamline · EduFlow · Vôlei Cidadão · Este site",
    subject: "Projeto: site ou sistema",
  },
  {
    id: "ia",
    icon: Sparkles,
    title: "Consultoria e soluções com IA",
    body: "Onde a IA ajuda no seu negócio e onde atrapalha. Agentes, automações e integrações com LLMs, com limite claro de autonomia e os dados protegidos.",
    proof: "Mestrado em IA · Régua de autonomia · HackTown 2026",
    subject: "Consultoria de IA",
  },
  {
    id: "infra",
    icon: ServerCog,
    title: "Cloud, DevOps e segurança",
    body: "AWS e Azure, CI/CD, observabilidade e LGPD pensadas desde o começo. Fundei a área de DevOps de uma empresa e hoje cuido da governança de TI dela.",
    proof: "DevOps, DPO e governança na Tech for Humans",
    subject: "Conversa sobre cloud e DevOps",
  },
  {
    id: "palestras",
    icon: Mic,
    title: "Palestras e mentoria",
    body: "IA na engenharia sem hype, carreira em tecnologia e mentoria de times em hackathons e startups.",
    proof: "HackTown 2026 · JobShop UNIFEI · NASA Space Apps",
    subject: "Convite para palestra",
  },
]
