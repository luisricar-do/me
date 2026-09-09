/** Abre a paleta de comandos de qualquer lugar, sem precisar de contexto. */
export function openCommandPalette() {
  window.dispatchEvent(new Event("palette:open"))
}
