/**
 * O fundo do desktop. Cada papel de parede é só camadas de CSS e um SVG,
 * nada de imagem para baixar, e todos seguem o tema claro/escuro pelos tokens.
 */
export function Wallpaper({ id }) {
  return (
    <div aria-hidden className={`wall wall-${id} pointer-events-none absolute inset-0 overflow-hidden`}>
      {id === "aurora" && (
        <>
          <span className="wall-blob wall-blob-a" />
          <span className="wall-blob wall-blob-b" />
          <span className="wall-blob wall-blob-c" />
        </>
      )}
      {id === "regua" && (
        <svg className="wall-ruler" viewBox="0 0 32 32" preserveAspectRatio="xMinYMax meet">
          <rect x="5" y="5" width="10" height="5" rx="1" />
          <rect x="5" y="14" width="16" height="5" rx="1" />
          <rect x="5" y="23" width="22" height="5" rx="1" className="wall-ruler-hot" />
        </svg>
      )}
      <span className="wall-grain" />
    </div>
  )
}
