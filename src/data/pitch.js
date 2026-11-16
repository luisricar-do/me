import { about } from "./about"

/**
 * A proposta para quem chega de uma empresa: o que muda, por que confiar e
 * como eu trabalho. O hero da versão simples e o "Sobre mim" da interativa
 * leem daqui, então a promessa é uma só nas duas.
 */
export const pitch = {
  headlineLead: "Governança e IA que rodam em produção,",
  headlineAccent: "não só no PDF.",
  lead: "Sou engenheiro antes de ser gestor. Desenho a arquitetura, entro no código e coloco LGPD, ISO 27001 e IA dentro da esteira de desenvolvimento. A conformidade vira rotina do time, e a IA só entra onde alguém responde pelo resultado.",
  primaryCta: "Conversar sobre o seu caso",
  secondaryCta: "Ver como eu trabalho",
}

/** Números que dá para conferir no próprio site. Nada de dado interno de cliente. */
export const metrics = [
  { value: "+50", label: "processos automatizados no Streamline" },
  { value: `${about.yearsAtCompany} anos`, label: "na Tech for Humans, de dev a gerente" },
  { value: "8", label: "pessoas no time de cloud, segurança e processos" },
  { value: "2", label: "artigos publicados no IEEE IISA" },
]

/** Como uma conversa vira entrega. */
export const method = [
  {
    step: "01",
    title: "Entender o problema",
    body: "Antes de propor ferramenta, eu entro no código, no processo e na planilha. Quase sempre o problema não é o que parecia na primeira reunião.",
  },
  {
    step: "02",
    title: "Desenhar e construir",
    body: "Arquitetura, controle e automação saem juntos. A IA entra até onde a régua de autonomia deixa, com um controle amarrado em cada saída.",
  },
  {
    step: "03",
    title: "Deixar rodando",
    body: "Fica no fluxo do time, com a evidência saindo sozinha e uma métrica para saber se melhorou. Se depende de mim para funcionar, não terminou.",
  },
]
