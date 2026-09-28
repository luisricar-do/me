import { useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import { site, mailto } from "../../data/site"
import { Button } from "../ui/Button"
import { Reveal } from "../ui/Reveal"
import { useTerminalIntro } from "../../hooks/useTerminalIntro"
import { useCursorTilt } from "../../hooks/useCursorTilt"
import { Terminal } from "../terminal/Terminal"

const COMMAND = "cat ~/me.txt"

const OUTPUT = [
  { kind: "accent", text: "# whoami" },
  { kind: "out", text: `${site.role} · ${site.company}` },
  { kind: "muted", text: "DPO: governança de dados e conformidade com a LGPD" },
  { kind: "blank", text: "" },
  { kind: "accent", text: "# no que trabalho" },
  { kind: "muted", text: "IA aplicada à engenharia, com critério de onde" },
  { kind: "muted", text: "ela entra. Nuvem, CI/CD e observabilidade na base." },
]

/** Onde a tese já foi testada: a prova vem antes da primeira rolagem. */
const PROOF = ["HackTown 2026", "JobShop UNIFEI", "IEEE IISA 2025 e 2026", "NASA Space Apps"]

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
            {site.role} · {site.company}
          </Reveal>

          <Reveal
            as="h1"
            delay={0.08}
            className="display mt-6 text-balance text-[clamp(2.5rem,6.5vw,5rem)] leading-[1] text-ink"
          >
            O mais difícil em IA é decidir{" "}
            <span className="italic text-accent">onde ela não entra.</span>
          </Reveal>

          <Reveal
            as="p"
            delay={0.2}
            className="mt-7 max-w-lg text-pretty text-lg leading-relaxed text-ink-soft"
          >
            Sou Luis Ricardo. Cuido para que a IA entre na
            engenharia pelo lugar certo: o que automatizar, o que continua com gente e como
            provar que está tudo sob controle, LGPD incluída.
          </Reveal>

          <Reveal delay={0.3} className="mt-9 flex flex-wrap gap-3">
            <Button href={mailto("Convite para palestra")}>
              Convidar para uma palestra
              <ArrowUpRight size={16} />
            </Button>
            <Button to="/ia" variant="outline">
              Testar a Régua de IA
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
            {PROOF.map((item) => (
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
