import { Cpu, Server, ShieldCheck } from "lucide-react"

/**
 * O que alguém pode me chamar para fazer. Cada bloco aponta para a prova
 * que já está no site e para o email com o assunto certo.
 * Palestra e mentoria ficam fora daqui de propósito: são um extra, não o trabalho.
 */
export const services = [
  {
    id: "ia-engenharia",
    icon: Cpu,
    title: "IA aplicada à engenharia",
    body: "Levo IA para dentro do fluxo de desenvolvimento e operação onde ela melhora o resultado de verdade: processo escrito, automação medida e gente onde ainda precisa de gente.",
    proof: "Gerente de Governança de TI e IA · Mestrado em IA",
    subject: "Conversa sobre IA na engenharia",
  },
  {
    id: "plataforma",
    icon: Server,
    title: "DevOps e plataforma",
    body: "Nuvem, CI/CD e observabilidade como base. Sem isso, IA só acelera o caos que já existe.",
    proof: "Fundei e geri a área de DevOps na Tech for Humans",
    subject: "Conversa sobre DevOps e plataforma",
  },
  {
    id: "governanca",
    icon: ShieldCheck,
    title: "Governança de TI e IA",
    body: "Segurança da informação, LGPD e políticas de uso de IA desenhadas junto com o produto, não coladas no fim como checklist.",
    proof: "DPO e gestor de governança na Tech for Humans",
    subject: "Conversa sobre governança de IA",
  },
]
