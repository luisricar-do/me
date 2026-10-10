import { site } from "./site"

/**
 * O Substack, onde o trabalho vira texto. Sem lista de posts aqui de
 * propósito: o feed não libera CORS e copiar à mão desatualiza no dia seguinte.
 */
export const writing = {
  href: site.substack,
  handle: "@luisricar",
  title: "IA na engenharia, do jeito que acontece no dia a dia.",
  body: "Comecei a escrever no Substack sobre o que funciona (e o que não funciona) quando a IA entra no trabalho de engenharia: fluxo de desenvolvimento, operação, automação e o critério de onde ela não deve entrar.",
  topics: ["IA no fluxo de dev", "Automação e agentes", "DevOps e plataforma", "Governança sem burocracia"],
}
