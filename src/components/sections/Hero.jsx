import { useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import { site, mailto, primarySubject } from "../../data/site"
import { metrics, pitch } from "../../data/pitch"
import { Button } from "../ui/Button"
import { Reveal } from "../ui/Reveal"
import { useTerminalIntro } from "../../hooks/useTerminalIntro"
import { useCursorTilt } from "../../hooks/useCursorTilt"
import { Terminal } from "../terminal/Terminal"

const COMMAND = "cat ~/me.txt"

const OUTPUT = [
  { kind: "accent", text: "# whoami" },
  { kind: "out", text: "engenheiro que faz a governança rodar" },
  { kind: "muted", text: `${site.role} · ${site.company}` },
  { kind: "blank", text: "" },
  { kind: "accent", text: "# o que eu resolvo" },
  { kind: "muted", text: "arquitetura de aplicação e integração" },
  { kind: "muted", text: "LGPD, ISO e auditoria dentro da esteira" },
  { kind: "muted", text: "IA com limite de autonomia" },
]


export function Hero() {
  const sectionRef = useRef(null)
  const terminalRef = useRef(null)
  const [chars, completeIntro] = useTerminalIntro(sectionRef, COMMAND.length)
  useCursorTilt(terminalRef)

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 pb-12 pt-28 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-14">
        <div className="min-w-0">
          <Reveal as="p" className="label flex items-center gap-3 text-muted">
            <span className="h-px w-8 bg-accent" aria-hidden />
            {site.tagline}
          </Reveal>

          <Reveal
            as="h1"
            delay={0.08}
            className="display mt-6 text-balance text-[clamp(2.5rem,6.5vw,5rem)] leading-[1] text-ink"
          >
            {pitch.headlineLead}{" "}
            <span className="italic text-accent">{pitch.headlineAccent}</span>
          </Reveal>

          <Reveal
            as="p"
            delay={0.2}
            className="mt-7 max-w-lg text-pretty text-lg leading-relaxed text-ink-soft"
          >
            {pitch.lead}
            <span className="mt-3 block text-base text-muted">
              Luis Ricardo · {site.role} e DPO na {site.company}
            </span>
          </Reveal>

          <Reveal delay={0.3} className="mt-9 flex flex-wrap gap-3">
            <Button href={mailto(primarySubject)}>
              {pitch.primaryCta}
              <ArrowUpRight size={16} />
            </Button>
            <Button href="#como-trabalho" variant="outline">
              {pitch.secondaryCta}
            </Button>
          </Reveal>
        </div>

        {/* Terminal: digita sozinho no load e vira shell de verdade no primeiro clique */}
        <div ref={terminalRef} data-tilt className="min-w-0">
          <Terminal
            typed={COMMAND.slice(0, chars)}
            command={COMMAND}
            intro={OUTPUT}
            onActivate={completeIntro}
          />
        </div>
      </div>

      <Reveal delay={0.4} className="mx-auto w-full max-w-6xl px-6 pb-10">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 md:grid-cols-4">
          {metrics.map((item) => (
            <div key={item.label} className="min-w-0">
              <dt className="sr-only">{item.label}</dt>
              <dd className="display text-3xl text-ink tabular-nums md:text-4xl">{item.value}</dd>
              <dd className="mt-1 text-pretty text-[13px] leading-snug text-muted">{item.label}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  )
}
