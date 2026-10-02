/** Abre e fecha o modo desktop de qualquer lugar, no mesmo padrão da paleta. */
export function openDesktop() {
  window.dispatchEvent(new Event("desktop:open"))
}

export function closeDesktop() {
  window.dispatchEvent(new Event("desktop:close"))
}

/** Seção da home → janela que mostra o mesmo conteúdo no desktop. */
export const SECTION_APP = {
  atuacao: "sobre",
  sobre: "sobre",
  palestras: "palestras",
  destaques: "destaques",
  trajetoria: "trajetoria",
  contato: "contato",
}
