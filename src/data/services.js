import { Blocks, BrainCircuit, ServerCog, ShieldCheck } from "lucide-react"

/**
 * Os problemas que eu resolvo. `problem` é a dor do jeito que a empresa fala,
 * `body` é o que eu faço com ela, `proof` aponta para a prova que já está no
 * site e `subject` é o assunto do email.
 */
export const services = [
  {
    id: "arquitetura",
    icon: Blocks,
    title: "Arquitetura e problema técnico difícil",
    problem: "“O sistema cresceu sem desenho e cada mudança quebra outra coisa.”",
    body: "Entro no código, mapeio o que existe e desenho a arquitetura do próximo passo: integrações, serviços, filas e dados. Comecei como dev fullstack e ainda resolvo com a mão na massa.",
    proof: "Streamline · open source · +50 processos em produção",
    subject: "Conversa sobre arquitetura",
  },
  {
    id: "governanca",
    icon: ShieldCheck,
    title: "Governança que roda",
    problem: "“A auditoria chega e as evidências estão espalhadas em planilha.”",
    body: "LGPD, ISO 27001, ISO 27701 e auditoria viram processo e ferramenta dentro da esteira de desenvolvimento. Sou DPO e cuido disso do desenho ao deploy.",
    proof: "DPO · ISO 27001 e 27701 · Tech for Humans",
    subject: "Conversa sobre governança",
  },
  {
    id: "ia",
    icon: BrainCircuit,
    title: "IA com limite de autonomia",
    problem: "“Todo mundo quer IA, mas ninguém sabe onde ela pode decidir sozinha.”",
    body: "Decido tarefa por tarefa até onde a IA vai e construo o agente, a integração ou o MCP com um controle amarrado em cada saída. Onde ela não deve entrar, eu digo.",
    proof: "Régua de autonomia · HackTown 2026 · Mestrado em IA",
    subject: "Conversa sobre IA e automação",
  },
  {
    id: "infra",
    icon: ServerCog,
    title: "Cloud, DevOps e custo",
    problem: "“A conta da nuvem sobe todo mês e o deploy depende de uma pessoa.”",
    body: "Fundei a área de DevOps da empresa: CI/CD, observabilidade e deploy padronizado em Azure e AWS. Hoje respondo também pelo custo de nuvem e tecnologia (FinOps).",
    proof: "DevOps e FinOps na Tech for Humans",
    subject: "Conversa sobre cloud e DevOps",
  },
]
