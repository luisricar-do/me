import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Check, Copy, RotateCcw } from "lucide-react"
import { questions, levels } from "../../data/aiRuler"
import { decodeAnswers, encodeAnswers, evaluate } from "../../lib/aiRuler"

export function AutonomyRuler() {
  const [params, setParams] = useSearchParams()
  const [answers, setAnswers] = useState(() => decodeAnswers(params.get("r")))
  const [copied, setCopied] = useState(false)

  const result = useMemo(() => evaluate(answers), [answers])
  const answered = questions.filter((question) => answers[question.id] != null).length

  function choose(id, index) {
    const next = { ...answers, [id]: index }
    setAnswers(next)
    const code = encodeAnswers(next)
    setParams(code.includes("-") ? {} : { r: code }, { replace: true })
    setCopied(false)
  }

  function reset() {
    setAnswers({})
    setParams({}, { replace: true })
    setCopied(false)
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
    } catch {
      /* sem permissão de clipboard: a URL está na barra de endereço */
    }
  }

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 border-t border-line pt-5">
        <p className="label text-accent">A régua</p>
        <p className="label text-muted tabular-nums">
          {answered} de {questions.length}
        </p>
      </div>

      <ol className="mt-8">
        {questions.map((question, index) => (
          <li key={question.id} className="border-b border-line-soft py-8 first:pt-0">
            <div className="flex items-baseline gap-4">
              <span className="label text-muted tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-pretty text-lg leading-snug text-ink">{question.question}</p>
                {question.note && (
                  <p className="mt-2 max-w-xl text-pretty text-sm leading-relaxed text-muted">
                    {question.note}
                  </p>
                )}

                <div className="mt-5 flex flex-col gap-2">
                  {question.options.map((option, optionIndex) => {
                    const selected = answers[question.id] === optionIndex
                    return (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() => choose(question.id, optionIndex)}
                        aria-pressed={selected}
                        className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors duration-200 ${
                          selected
                            ? "border-accent bg-accent-tint text-ink"
                            : "border-line text-ink-soft hover:border-ink hover:text-ink"
                        }`}
                      >
                        <span
                          className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border ${
                            selected ? "border-accent bg-accent" : "border-line"
                          }`}
                        >
                          {selected && <Check size={10} className="text-accent-ink" />}
                        </span>
                        {option.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>

      {result && (
        <div className="fade-swap mt-12">
          {result.blocked ? (
            <div className="space-y-4">
              {result.blocked.map((gate) => (
                <article
                  key={gate.title}
                  className="rounded-xl border border-line bg-surface p-6 md:p-8"
                >
                  <p className="label text-muted">Antes do nível</p>
                  <h3 className="display mt-4 text-[clamp(1.5rem,3.5vw,2.25rem)] text-ink">
                    {gate.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted">
                    {gate.body}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <article className="rounded-xl border border-accent bg-surface p-6 md:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <p className="label text-accent">Nível recomendado</p>
                <p className="label text-muted tabular-nums">
                  {result.score} de {result.max} pontos
                </p>
              </div>

              <h3 className="display mt-4 text-[clamp(2rem,5vw,3.25rem)] text-ink">
                {result.levelInfo.code} · {result.levelInfo.name}
              </h3>
              <p className="mt-1 font-mono text-sm text-accent">{result.levelInfo.motto}</p>
              <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft">
                {result.levelInfo.description}
              </p>
              <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted">
                {result.levelInfo.action}
              </p>

              {result.cap < 3 && (
                <p className="mt-6 border-t border-line-soft pt-5 font-mono text-[11px] text-muted">
                  Teto pela regra de ouro: {levels[result.cap].name.toLowerCase()}.
                </p>
              )}
            </article>
          )}

          {result.flags.length > 0 && (
            <div className="mt-8 border-t border-line pt-6">
              <p className="label text-muted">O que puxou para baixo</p>
              <ul className="mt-4 space-y-2">
                {result.flags.map((flag) => (
                  <li key={flag} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                    {flag}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-[11px] text-ink-soft transition-colors hover:border-accent hover:text-accent"
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? "link copiado" : "copiar este resultado"}
            </button>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-[11px] text-ink-soft transition-colors hover:border-accent hover:text-accent"
            >
              <RotateCcw size={13} />
              recomeçar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
