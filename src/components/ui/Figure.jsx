/**
 * Imagem com proporção fixa. Só é usada quando existe arquivo — os dados
 * guardam `null` enquanto a foto não chega, e o chamador nem renderiza.
 */
export function Figure({ src, alt, caption, ratio = "4 / 3", className = "" }) {
  if (!src) return null

  return (
    <figure className={className}>
      <div
        className="overflow-hidden rounded-xl border border-line bg-surface-2"
        style={{ aspectRatio: ratio }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 font-mono text-[11px] text-muted">{caption}</figcaption>
      )}
    </figure>
  )
}
