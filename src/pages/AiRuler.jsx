import { ArrowLeft, Mic } from "lucide-react"
import { Link } from "react-router-dom"
import { Reveal } from "../components/ui/Reveal"
import { Figure } from "../components/ui/Figure"
import { Button } from "../components/ui/Button"
import { AutonomyRuler } from "../components/ia/AutonomyRuler"
import { usePageMeta } from "../hooks/usePageMeta"
import { evidence, goldenRule, levels, principles, story } from "../data/aiRuler"
import { talks } from "../data/talks"
import { site } from "../data/site"

const talk = talks.find((item) => item.id === "hacktown-2026")

export function AiRuler() {
  usePageMeta(
    "Onde a IA não deve entrar · Régua de autonomia",
    "A régua de autonomia que apresentei no HackTown 2026: responda seis perguntas sobre uma tarefa e descubra que nível de autonomia ela aceita."
  )

  return (
    <>
      <header className="mx-auto max-w-6xl px-6 pb-16 pt-32 md:pb-24 md:pt-40">
        <Reveal>
          <Link
            to="/#palestras"
            className="inline-flex items-center gap-2 font-mono text-[11px] text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft size={13} />
            palestras
          </Link>
        </Reveal>

        <Reveal delay={0.06} className="mt-8 border-t border-line pt-5">
          <p className="label flex items-center gap-2 text-accent">
            <Mic size={12} />
            {talk.event}
          </p>
          <h1 className="display mt-5 max-w-4xl text-balance text-[clamp(2.5rem,8vw,5.5rem)] text-ink">
            Onde a IA <span className="italic text-accent">não</span> deve entrar
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft md:text-xl">
            A decisão mais AI First que você vai tomar. Esta é a régua que eu levei ao palco
            em Santa Rita do Sapucaí, virada ferramenta: responda seis perguntas sobre uma
            tarefa e veja que nível de autonomia ela aceita.
          </p>
        </Reveal>
      </header>

      {/* A história que abre a palestra */}
      <section className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <Reveal className="grid gap-10 border-t border-line pt-10 md:grid-cols-[0.85fr_1.15fr] md:gap-12">
          <Figure
            src={talk.photo}
            alt={`Luis Ricardo Santos falando no ${talk.event}`}
            ratio="4 / 3"
            caption={`${talk.event} · ${talk.location} · ${talk.dateLabel}`}
          />
          <div className="min-w-0">
            <p className="label text-muted">{story.date}</p>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-ink-soft">{story.lead}</p>
            <p className="display mt-6 text-[clamp(1.75rem,4vw,2.75rem)] text-ink">{story.punch}</p>
            <p className="mt-6 max-w-xl text-pretty leading-relaxed text-muted">{story.moral}</p>
          </div>
        </Reveal>
      </section>

      {/* Números levados ao palco */}
      <section className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <Reveal className="border-t border-line pt-5">
          <p className="label text-muted">Os números que eu levei</p>
        </Reveal>
        <dl className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {evidence.map((item, i) => (
            <Reveal key={item.value + i} delay={i * 0.05}>
              <dd className="display text-[clamp(2.5rem,6vw,4rem)] text-accent">{item.value}</dd>
              <dt className="mt-3 text-pretty text-sm leading-relaxed text-muted">
                {item.label}
              </dt>
              {item.source && (
                <a
                  href={item.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block font-mono text-[11px] text-muted hover:text-accent"
                >
                  fonte
                </a>
              )}
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Os três níveis */}
      <section className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <Reveal className="border-t border-line pt-5">
          <p className="label text-accent">A régua</p>
          <h2 className="display mt-5 max-w-3xl text-balance text-[clamp(2rem,5vw,3.25rem)] text-ink">
            Três níveis de autonomia.
          </h2>
          <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted">{goldenRule}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {Object.values(levels).map((level, i) => (
            <Reveal
              key={level.code}
              delay={i * 0.06}
              as="article"
              className="rounded-xl border border-line bg-surface p-6"
            >
              <p className="label text-muted">{level.code}</p>
              <h3 className="display mt-4 text-3xl text-ink">{level.name}</h3>
              <p className="mt-1 font-mono text-xs text-accent">{level.motto}</p>
              <p className="mt-5 text-pretty text-sm leading-relaxed text-muted">
                {level.description}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Ferramenta */}
      <section className="mx-auto max-w-3xl px-6 pb-20 md:pb-28">
        <AutonomyRuler />
      </section>

      {/* Só é AI-first o que está escrito */}
      <section className="mx-auto max-w-6xl px-6 pb-24 md:pb-32">
        <Reveal className="border-t border-line pt-5">
          <p className="label text-accent">O pré-requisito</p>
          <h2 className="display mt-5 max-w-3xl text-balance text-[clamp(2rem,5vw,3.25rem)] text-ink">
            Só é AI-first o que está escrito.
          </h2>
          <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted">
            O que mora na cabeça de alguém nenhuma IA consegue executar. Foi por isso que a
            gente virou tudo em texto.
          </p>
        </Reveal>

        <ol className="mt-10">
          {principles.map((principle, i) => (
            <Reveal
              as="li"
              key={principle.code}
              delay={i * 0.06}
              className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line-soft py-5 last:border-b"
            >
              <span className="label text-muted tabular-nums">{principle.code}</span>
              <p className="text-pretty leading-relaxed text-ink-soft">{principle.text}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1} className="mt-16 border-t border-line pt-10">
          <p className="display max-w-3xl text-balance text-[clamp(1.75rem,4.5vw,2.75rem)] text-ink">
            A IA não conserta um time. Ela amplifica o que já existe, inclusive o caos.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={`mailto:${site.email}`}>Chamar para uma conversa</Button>
            <Button to="/" variant="outline">
              Voltar ao início
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  )
}
