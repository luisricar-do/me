import { useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import { site, mailto, primarySubject } from "../../data/site"
import { proof } from "../../data/about"
import { Button } from "../ui/Button"
import { Reveal } from "../ui/Reveal"
import { useTerminalIntro } from "../../hooks/useTerminalIntro"
import { useCursorTilt } from "../../hooks/useCursorTilt"
import { Terminal } from "../terminal/Terminal"

const COMMAND = "cat ~/me.txt"

const OUTPUT = [
  { kind: "accent", text: "# whoami" },
  { kind: "out", text: "técnico que faz a governança rodar" },
  { kind: "muted", text: `${site.role} · ${site.company}` },
  { kind: "blank", text: "" },
  { kind: "accent", text: "# o que eu faço" },
  { kind: "muted", text: "LGPD, ISO e auditoria dentro da esteira" },
  { kind: "muted", text: "ferramenta e processo, com ou sem IA" },
  { kind: "muted", text: "time de 8: cloud, segurança, processos" },
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
            Transformo burocracia em{" "}
            <span className="italic text-accent">sistema que roda.</span>
          </Reveal>

          <Reveal
            as="p"
            delay={0.2}
            className="mt-7 max-w-lg text-pretty text-lg leading-relaxed text-ink-soft"
          >
            Sou Luis Ricardo, {site.role} e DPO na {site.company}. O técnico que gosta da
            parte que ninguém quer: LGPD, ISO, auditoria, processo. Construo a ferramenta e o
            processo junto, com IA quando ela ajuda e sem quando não ajuda.
          </Reveal>

          <Reveal delay={0.3} className="mt-9 flex flex-wrap gap-3">
            <Button href={mailto(primarySubject)}>
              Falar comigo
              <ArrowUpRight size={16} />
            </Button>
            <Button href="#projetos" variant="outline">
              Ver o que eu construí
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
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-line pt-5">
          <span className="label text-muted">Já passei por</span>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {proof.map((item) => (
              <li key={item} className="font-mono text-[12px] text-ink-soft">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  )
}
