import { Reveal } from "./Reveal"

/**
 * Citação editorial de largura cheia. As frases vêm das palestras, então a
 * fonte é sempre creditada.
 */
export function PullQuote({ quote, source, children, className = "" }) {
  return (
    <Reveal
      as="figure"
      className={`mx-auto max-w-6xl border-y border-line px-6 py-16 md:py-24 ${className}`}
    >
      <blockquote className="display max-w-4xl text-balance text-[clamp(1.75rem,5vw,3.25rem)] text-ink">
        <span aria-hidden className="text-accent">“</span>
        {quote}
        <span aria-hidden className="text-accent">”</span>
      </blockquote>
      {source && (
        <figcaption className="label mt-8 text-muted">{source}</figcaption>
      )}
      {children}
    </Reveal>
  )
}
