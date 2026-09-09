/**
 * A marca: a régua de autonomia da palestra, três níveis crescentes, com
 * verde só no terceiro. As duas primeiras barras usam currentColor, então
 * a marca acompanha a cor do texto onde for colocada.
 */
export function Mark({ size = 18, className = "", title }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      <rect x="5" y="5" width="10" height="5" rx="1" fill="currentColor" />
      <rect x="5" y="14" width="16" height="5" rx="1" fill="currentColor" />
      <rect x="5" y="23" width="22" height="5" rx="1" fill="var(--accent)" />
    </svg>
  )
}
