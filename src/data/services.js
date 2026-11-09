import { Mic, ServerCog, ShieldCheck, Workflow } from "lucide-react"

/**
 * O que eu faço. Cada bloco aponta para a prova que já está no site e para
 * o email com o assunto certo.
 */
export const services = [
  {
    id: "governanca",
    icon: ShieldCheck,
    title: "Governança que roda",
    body: "LGPD, ISO 27001, ISO 27701 e auditoria viram processo e ferramenta dentro da esteira de desenvolvimento. Sou DPO e cuido disso do desenho ao deploy.",
    proof: "DPO · ISO 27001 e 27701 · Tech for Humans",
    subject: "Conversa sobre governança",
  },
  {
    id: "ferramentas",
    icon: Workflow,
    title: "Ferramentas e processos, com ou sem IA",
    body: "Quando um processo trava, eu construo o que destrava: uma plataforma, uma integração ou um agente. A IA entra onde ajuda, com limite de autonomia e alguém respondendo pelo resultado.",
    proof: "Streamline · Régua de autonomia · Mestrado em IA",
    subject: "Conversa sobre IA e automação",
  },
  {
    id: "infra",
    icon: ServerCog,
    title: "Cloud, DevOps e custo",
    body: "Fundei a área de DevOps da empresa: CI/CD, observabilidade e deploy padronizado em Azure e AWS. Hoje respondo também pelo custo de nuvem e tecnologia (FinOps).",
    proof: "DevOps e FinOps na Tech for Humans",
    subject: "Conversa sobre cloud e DevOps",
  },
  {
    id: "palestras",
    icon: Mic,
    title: "Palestras e mentoria",
    body: "IA na engenharia sem hype, governança e carreira em tecnologia. Também mentoro times em hackathons e startups.",
    proof: "HackTown 2026 · JobShop UNIFEI · NASA Space Apps",
    subject: "Convite para palestra",
  },
]
