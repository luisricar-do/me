import { Reveal } from "./Reveal"

/**
 * Cabeçalho editorial de seção: número, eyebrow em mono, título em serifa
 * e um lead opcional, sempre apoiados numa linha fina.
 */
export function SectionTitle({ index, eyebrow, title, lead, className = "" }) {
  return (
    <Reveal className={`border-t border-line pt-5 ${className}`}>
      <div className="flex items-baseline gap-4">
        {index && (
          <span className="label text-muted tabular-nums">{index}</span>
        )}
        {eyebrow && <span className="label text-accent">{eyebrow}</span>}
      </div>
      <h2 className="display mt-5 max-w-3xl text-balance text-[clamp(2.25rem,6vw,4rem)] text-ink">
        {title}
      </h2>
      {lead && (
        <p className="mt-5 max-w-xl text-pretty text-[0.975rem] leading-relaxed text-muted">
          {lead}
        </p>
      )}
    </Reveal>
  )
}
