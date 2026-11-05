/**
 * Props para as fotos pessoais: sem arrastar para fora e sem o menu de
 * "Salvar imagem". Não impede print nem quem abre o DevTools; só tira o
 * caminho fácil. A classe `photo-guard` (index.css) cobre o toque longo do iOS.
 */
export const photoGuard = {
  draggable: false,
  onContextMenu: (event) => event.preventDefault(),
}
