import { site } from "./site"

/**
 * O Substack, onde o trabalho vira texto: a newsletter Big Rick. Sem lista
 * de posts aqui de propósito: o feed não libera CORS e copiar à mão
 * desatualiza no dia seguinte.
 */
export const writing = {
  href: site.substack,
  handle: "Big Rick",
  title: "Entenda a IA que você já usa.",
  body: "Na Big Rick, cada edição pega um assunto de IA e explica sem jargão, pra quem é técnico e pra quem não é. O Little Rick vai perguntando tudo no caminho.",
  topics: ["Um assunto de IA por edição", "Explicado sem jargão", "Pra quem é técnico e pra quem não é", "Com o Little Rick perguntando tudo"],
}
