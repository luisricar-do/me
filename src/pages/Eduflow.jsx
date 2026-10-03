import { ArrowLeft, ArrowUpRight, Star } from "lucide-react"
import { SiteLink } from "../components/ui/SiteLink"
import { Reveal } from "../components/ui/Reveal"
import { Figure } from "../components/ui/Figure"
import { Button } from "../components/ui/Button"
import { usePageMeta } from "../hooks/usePageMeta"
import { eduflow } from "../data/eduflow"

/** `embedded`: dentro de uma janela ou app, sem o cabeçalho fixo do site por cima. */
export function Eduflow({ embedded = false }) {
  usePageMeta(
    embedded ? null : "EduFlow · Case",
    embedded ? null : "Sistema low-code configurável para gestão de TCCs, avaliado com usuários e publicado no IEEE IISA 2025."
  )

  return (
    <>
      <header
        className={`mx-auto max-w-6xl px-6 pb-16 @3xl:pb-24 ${embedded ? "pt-8 @3xl:pt-12" : "pt-32 @3xl:pt-40"}`}
      >
        {!embedded && (
          <Reveal>
            <SiteLink
              to="/#destaques"
              className="inline-flex items-center gap-2 font-mono text-[11px] text-muted transition-colors hover:text-accent"
            >
              <ArrowLeft size={13} />
              destaques
            </SiteLink>
          </Reveal>
        )}

        <Reveal delay={0.06} className={`border-t border-line pt-5 ${embedded ? "" : "mt-8"}`}>
          <p className="label flex items-center gap-2 text-accent">
            <Star size={12} />
            {eduflow.venue}
          </p>
          <h1 className="display mt-5 text-[clamp(3rem,10cqw,6.5rem)] text-ink">
            {eduflow.title}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft @3xl:text-xl">
            {eduflow.tagline}
          </p>
          <p className="mt-4 font-mono text-[11px] text-muted">
            {eduflow.institution} · {eduflow.place}
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-12 grid gap-6 border-t border-line pt-8 @2xl:grid-cols-3">
          {eduflow.metrics.map((metric) => (
            <div key={metric.label}>
              <p className="display text-[clamp(2rem,5cqw,3rem)] text-accent">{metric.value}</p>
              <p className="mt-2 text-pretty text-xs leading-snug text-muted">{metric.label}</p>
            </div>
          ))}
        </Reveal>
      </header>

      {eduflow.sections.map((section, i) => (
        <section key={section.id} className="mx-auto max-w-6xl px-6 pb-16 @3xl:pb-24">
          <Reveal className="grid gap-8 border-t border-line pt-8 @3xl:grid-cols-[14rem_1fr] @3xl:gap-12">
            <div>
              <p className="label text-accent @3xl:sticky @3xl:top-[var(--sticky-top,7rem)]">{section.eyebrow}</p>
            </div>
            <div className="min-w-0">
              <h2 className="display max-w-2xl text-balance text-[clamp(1.75rem,4.5cqw,2.75rem)] text-ink">
                {section.title}
              </h2>
              <div className="mt-6 space-y-4">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="max-w-2xl text-pretty leading-relaxed text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
              {i === 0 && eduflow.screenshots.length > 0 && (
                <div className="mt-10 grid gap-6 @2xl:grid-cols-2">
                  {eduflow.screenshots.map((shot) => (
                    <Figure key={shot.src} src={shot.src} alt={shot.alt} ratio="16 / 10" />
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        </section>
      ))}

      {eduflow.learnings.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-16 @3xl:pb-24">
          <Reveal className="border-t border-line pt-8">
            <p className="label text-accent">Aprendizados</p>
            <ul className="mt-6 max-w-2xl space-y-4">
              {eduflow.learnings.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-muted">
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-6 pb-24 @3xl:pb-32">
        <Reveal className="border-t border-line pt-10">
          <p className="label text-muted">Publicação</p>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-ink-soft">
            {eduflow.venueFull} ({eduflow.venue.split(" · ")[1]}), {eduflow.place}.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {eduflow.stack.map((item) => (
              <li
                key={item}
                className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={eduflow.paperHref} target="_blank" rel="noopener noreferrer">
              Ler no IEEE Xplore
              <ArrowUpRight size={16} />
            </Button>
            {!embedded && (
              <Button to="/" variant="outline">
                Voltar ao início
              </Button>
            )}
          </div>
        </Reveal>
      </section>
    </>
  )
}
