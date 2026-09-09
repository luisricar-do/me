import { useRef } from "react"
import { ArrowDown } from "lucide-react"
import { site } from "../../data/site"
import { Button } from "../ui/Button"
import { Reveal } from "../ui/Reveal"
import { useTerminalScroll } from "../../hooks/useTerminalScroll"
import { useCursorTilt } from "../../hooks/useCursorTilt"
import { Terminal } from "../terminal/Terminal"

const COMMAND = "cat ~/me.txt"

const OUTPUT = [
  { kind: "accent", text: "# whoami" },
  { kind: "out", text: `${site.role} · ${site.company}` },
  { kind: "muted", text: "DPO: governança de dados e conformidade com a LGPD" },
  { kind: "blank", text: "" },
  { kind: "accent", text: "# no que trabalho" },
  { kind: "muted", text: "Arquitetura em nuvem, CI/CD, observabilidade" },
  { kind: "muted", text: "e IA aplicada a processos de engenharia." },
]

export function Hero() {
  const sectionRef = useRef(null)
  const terminalRef = useRef(null)
  const [chars, completeIntro] = useTerminalScroll(sectionRef, COMMAND.length)
  useCursorTilt(terminalRef)

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-[125vh] md:min-h-[150vh]">
      <div className="sticky top-0 flex min-h-svh items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 pb-24 pt-28 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-14 md:pb-20">
          {/* Coluna editorial: aparece no load, não depende de scroll */}
          <div className="min-w-0">
            <Reveal as="p" className="label flex items-center gap-3 text-muted">
              <span className="h-px w-8 bg-accent" aria-hidden />
              {site.tagline}
            </Reveal>

            <Reveal
              as="h1"
              delay={0.08}
              className="display mt-6 text-[clamp(3rem,10vw,7rem)] leading-[0.95] text-ink"
            >
              <span className="block">Luis Ricardo</span>
              <span className="block italic text-accent">Santos</span>
            </Reveal>

            <Reveal
              as="p"
              delay={0.2}
              className="mt-7 max-w-md text-pretty leading-relaxed text-ink-soft"
            >
              {site.role} na {site.company}. Trabalho onde estratégia e execução se
              encontram: nuvem, automação, dados e IA, com governança de verdade por trás.
            </Reveal>

            <Reveal delay={0.3} className="mt-9 flex flex-wrap gap-3">
              <Button href="#palestras">Ver palestras</Button>
              <Button to="/ia" variant="outline">
                Régua de IA
              </Button>
            </Reveal>
          </div>

          {/* Terminal: abre com o scroll e vira shell de verdade no primeiro clique */}
          <div ref={terminalRef} data-tilt className="min-w-0">
            <Terminal
              typed={COMMAND.slice(0, chars)}
              command={COMMAND}
              intro={OUTPUT}
              onActivate={completeIntro}
            />
          </div>
        </div>

        <a
          href="#sobre"
          data-stage-out
          className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors hover:text-accent"
          aria-label="Rolar para a seção Sobre"
        >
          <span className="label">rolar</span>
          <ArrowDown size={16} className="animate-bounce" />
        </a>
      </div>
    </section>
  )
}
