import { ArrowUpRight, FileText, Mic, Youtube } from "lucide-react"
import { SectionTitle } from "../ui/SectionTitle"
import { Reveal } from "../ui/Reveal"
import { Figure } from "../ui/Figure"
import { Button } from "../ui/Button"
import { talks, talkKinds } from "../../data/talks"

const featured = talks.filter((talk) => talk.kind === "palestra")
// A lista abaixo é o índice completo, incluindo as palestras destacadas acima
const index = [...talks].sort((a, b) => b.date.localeCompare(a.date))

export function Talks() {
  return (
    <section id="palestras" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionTitle
        index="03"
        eyebrow="Palestras"
        title="O que eu levei para o palco."
        lead="Duas palestras em 2026, mais mentorias em hackathon e maratona de inovação."
      />

      <div className="mt-14 md:mt-20">
        {featured.map((talk, i) => (
          <FeaturedTalk key={talk.id} talk={talk} index={i} />
        ))}
      </div>

      <Reveal className="mt-16">
        <p className="label text-muted">Todas as aparições</p>
        <ul className="mt-5">
          {index.map((talk) => (
            <li
              key={talk.id}
              className="grid gap-1 border-t border-line-soft py-4 last:border-b sm:grid-cols-[7rem_1fr_auto] sm:items-baseline sm:gap-6"
            >
              <span className="label text-muted">{talkKinds[talk.kind]}</span>
              <div className="min-w-0">
                <p className="text-[0.95rem] font-medium text-ink">{talk.title}</p>
                <p className="mt-1 text-sm text-muted">{talk.subtitle}</p>
              </div>
              <span className="label shrink-0 text-muted">{talk.dateLabel}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}

function FeaturedTalk({ talk, index }) {
  return (
    <Reveal
      as="article"
      delay={index * 0.06}
      className="grid gap-8 border-t border-line py-10 last:border-b md:grid-cols-[0.85fr_1.15fr] md:gap-12 md:py-14"
    >
      <Figure
        src={talk.photo}
        alt={`${talk.title}, no ${talk.event}`}
        ratio="4 / 3"
        caption={`${talk.event} · ${talk.location}`}
      />

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 font-mono text-[11px] text-ink-soft">
            <Mic size={11} className="text-accent" />
            {talkKinds[talk.kind]}
          </span>
          <span className="font-mono text-[11px] text-muted">{talk.dateLabel}</span>
        </div>

        <h3 className="display mt-5 text-[clamp(1.875rem,4.5vw,3rem)] text-ink">{talk.title}</h3>
        <p className="mt-3 text-pretty text-lg leading-relaxed text-muted">{talk.subtitle}</p>

        {talk.thesis && (
          <blockquote className="mt-7 border-l-2 border-accent pl-5 text-pretty text-[0.975rem] leading-relaxed text-ink-soft">
            {talk.thesis}
          </blockquote>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          {talk.toolHref && (
            <Button to={talk.toolHref}>
              {talk.toolLabel}
              <ArrowUpRight size={16} />
            </Button>
          )}
          {talk.slidesHref && (
            <a
              href={talk.slidesHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[11px] text-muted transition-colors hover:text-ink"
            >
              <FileText size={14} />
              Slides
            </a>
          )}
          {talk.videoHref && (
            <a
              href={talk.videoHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[11px] text-muted transition-colors hover:text-ink"
            >
              <Youtube size={14} />
              Gravação
            </a>
          )}
        </div>
      </div>
    </Reveal>
  )
}
