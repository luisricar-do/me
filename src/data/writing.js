import { site } from "./site"

/**
 * O Substack, onde o trabalho vira texto. Sem lista de posts aqui de
 * propósito: o feed não libera CORS e copiar à mão desatualiza no dia seguinte.
 */
export const writing = {
  href: site.substack,
  handle: "@luisricar",
  title: "O que aprendo construindo, por escrito.",
  body: "Escrevo no Substack sobre o que funciona (e o que não funciona) quando a IA entra no trabalho de verdade: desenvolvimento, nuvem, automação e o critério de onde ela não deve entrar.",
  topics: ["IA aplicada no dia a dia", "Desenvolvimento e arquitetura", "Cloud e DevOps", "Onde a IA não deve entrar"],
}
