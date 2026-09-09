import { useState } from "react"
import { ArrowUpRight, RotateCcw } from "lucide-react"
import { Link } from "react-router-dom"
import { Reveal } from "../ui/Reveal"
import { goldenRule, levels, questions } from "../../data/aiRuler"

const first = questions[0]

/**
 * A primeira pergunta da régua, respondível na própria home. A resposta
 * viaja para /ia pela URL, então a pessoa continua de onde parou.
 */
export function RulerTeaser() {
  const [choice, setChoice] = useState(null)

  const option = choice == null ? null : first.options[choice]
  const cap = option ? levels[option.value + 1] : null
  const handoff = choice == null ? "/ia" : `/ia?r=${choice}${"-".repeat(questions.length - 1)}`

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <Reveal className="grid gap-10 border-t border-line pt-10 md:grid-cols-[1fr_1fr] md:gap-16">
        <div className="min-w-0">
          <p className="label text-accent">Comece aqui</p>
          <h2 className="display mt-5 text-balance text-[clamp(1.75rem,4vw,2.5rem)] text-ink">
            {first.question}
          </h2>
          <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted">{goldenRule}</p>
        </div>

        <div className="min-w-0">
          <div className="flex flex-col gap-2">
            {first.options.map((item, index) => {
              const selected = choice === index
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setChoice(index)}
                  aria-pressed={selected}
                  className={`rounded-lg border px-4 py-3 text-left text-sm transition-colors duration-200 ${
                    selected
                      ? "border-accent bg-accent-tint text-ink"
                      : "border-line text-ink-soft hover:border-ink hover:text-ink"
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </div>

          {cap && (
            <div className="fade-swap mt-8 border-t border-line pt-6">
              <p className="label text-muted">Teto de autonomia</p>
              <p className="display mt-3 text-[clamp(1.5rem,3.5vw,2.25rem)] text-ink">
                {cap.code} · {cap.name}
              </p>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">
                {cap.description}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                <Link
                  to={handoff}
                  className="group inline-flex items-center gap-2 rounded-full border border-ink bg-ink px-5 py-2.5 text-sm font-medium text-paper transition duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-accent-ink"
                >
                  Responder as outras cinco
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => setChoice(null)}
                  className="inline-flex items-center gap-2 font-mono text-[11px] text-muted transition-colors hover:text-accent"
                >
                  <RotateCcw size={13} />
                  limpar
                </button>
              </div>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  )
}
