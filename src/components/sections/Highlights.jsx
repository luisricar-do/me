import { ArrowUpRight, FileText, Youtube } from "lucide-react"
import { Link } from "react-router-dom"
import { SectionTitle } from "../ui/SectionTitle"
import { Reveal } from "../ui/Reveal"
import { highlights } from "../../data/highlights"
import { publications } from "../../data/publications"

export function Highlights() {
  return (
    <section id="destaques" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionTitle
        index="02"
        eyebrow="Destaques"
        title="Dois projetos que saíram do papel."
        lead="Um virou publicação internacional; o outro roda todo dia dentro da empresa."
      />

      <div className="mt-14 md:mt-20">
        {highlights.map((item, i) => (
          <HighlightRow key={item.id} item={item} index={i} />
        ))}
      </div>

      <Reveal className="mt-16">
        <p className="label text-muted">Publicações</p>
        <ul className="mt-5">
          {publications.map((paper) => (
            <li
              key={paper.id}
              className="grid gap-2 border-t border-line-soft py-5 last:border-b sm:grid-cols-[9rem_1fr] sm:gap-6"
            >
              <div>
                <p className="label text-accent">{paper.venue}</p>
                <p className="mt-1.5 font-mono text-[11px] text-muted">{paper.dateLabel}</p>
              </div>

              <div className="min-w-0">
                <p className="text-pretty text-[0.95rem] font-medium leading-snug text-ink">
                  {paper.title}
                </p>
                {paper.subtitle && (
                  <p className="mt-1 text-pretty text-sm leading-relaxed text-muted">
                    {paper.subtitle}
                  </p>
                )}
                <p className="mt-2 text-xs text-muted">
                  {paper.venueFull} · {paper.place}
                </p>
                <p className="mt-1.5 font-mono text-[11px] text-muted">{paper.status}</p>

                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                  {paper.href && (
                    <a
                      href={paper.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-[11px] text-ink-soft transition-colors hover:text-accent"
                    >
                      <FileText size={13} />
                      IEEE Xplore
                    </a>
                  )}
                  {paper.caseHref && (
                    <Link
                      to={paper.caseHref}
                      className="inline-flex items-center gap-1.5 font-mono text-[11px] text-ink-soft transition-colors hover:text-accent"
                    >
                      <ArrowUpRight size={13} />
                      case
                    </Link>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}

function HighlightRow({ item, index }) {
  const Icon = item.badgeIcon

  return (
    <Reveal
      as="article"
      delay={index * 0.06}
      className="grid gap-6 border-t border-line py-10 last:border-b md:grid-cols-[4rem_1fr] md:gap-10 md:py-14"
    >
      <span className="label text-muted tabular-nums">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 font-mono text-[11px] text-ink-soft">
            {Icon && <Icon size={11} className="text-accent" />}
            {item.badge}
          </span>
          <span className="font-mono text-[11px] text-muted">{item.context}</span>
        </div>

        <h3 className="display mt-5 text-[clamp(2rem,4.5vw,3.25rem)] text-ink">
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-start gap-3 transition-colors hover:text-accent"
          >
            {item.title}
            <ArrowUpRight
              size={22}
              className="mt-2 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
            />
          </a>
        </h3>

        <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted">
          {item.description}
        </p>

        <dl className="mt-8 grid max-w-xl grid-cols-3 gap-6 border-t border-line-soft pt-5">
          {item.metrics.map((metric) => (
            <div key={metric.label}>
              <dd className="font-mono text-lg text-accent">{metric.value}</dd>
              <dt className="mt-1 text-[11px] leading-snug text-muted">{metric.label}</dt>
            </div>
          ))}
        </dl>

        {item.caseHref && (
          <Link
            to={item.caseHref}
            className="group/case mt-7 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
          >
            <span className="link-underline">Ler o case completo</span>
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover/case:-translate-y-0.5 group-hover/case:translate-x-0.5"
            />
          </Link>
        )}

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          <ul className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>

          {item.videoHref && (
            <a
              href={item.videoHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[11px] text-muted transition-colors hover:text-ink"
            >
              <Youtube size={14} />
              Ver apresentação
            </a>
          )}
        </div>
      </div>
    </Reveal>
  )
}
