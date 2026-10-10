import { useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import { site, mailto } from "../../data/site"
import { proof } from "../../data/about"
import { Button } from "../ui/Button"
import { Reveal } from "../ui/Reveal"
import { useTerminalIntro } from "../../hooks/useTerminalIntro"
import { useCursorTilt } from "../../hooks/useCursorTilt"
import { Terminal } from "../terminal/Terminal"

const COMMAND = "cat ~/me.txt"

const OUTPUT = [
  { kind: "accent", text: "# whoami" },
  { kind: "out", text: `${site.role} · ${site.company}` },
  { kind: "muted", text: "fullstack → DevOps → governança de TI e IA" },
  { kind: "blank", text: "" },
  { kind: "accent", text: "# no que trabalho" },
  { kind: "muted", text: "IA aplicada à engenharia, com critério de onde" },
  { kind: "muted", text: "ela entra. Nuvem, CI/CD e observabilidade na base." },
  { kind: "muted", text: "escrevo sobre isso em substack.com/@luisricar" },
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
            {site.role} · {site.company}
          </Reveal>

          <Reveal
            as="h1"
            delay={0.08}
            className="display mt-6 text-balance text-[clamp(2.5rem,6.5vw,5rem)] leading-[1] text-ink"
          >
            Uso IA para a engenharia{" "}
            <span className="italic text-accent">funcionar melhor.</span>
          </Reveal>

          <Reveal
            as="p"
            delay={0.2}
            className="mt-7 max-w-lg text-pretty text-lg leading-relaxed text-ink-soft"
          >
            Sou Luis Ricardo. Venho do código e do DevOps, e hoje levo IA para dentro do
            fluxo de engenharia: o que automatizar, o que continua com gente e como provar
            que está tudo sob controle. Inclusive decidir onde ela não entra.
          </Reveal>

          <Reveal delay={0.3} className="mt-9 flex flex-wrap gap-3">
            <Button href={mailto("Conversa sobre IA na engenharia")}>
              Falar sobre IA no seu time
              <ArrowUpRight size={16} />
            </Button>
            <Button href={site.substack} target="_blank" rel="noopener noreferrer" variant="outline">
              Ler no Substack
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
          <span className="label text-muted">Na prática</span>
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
