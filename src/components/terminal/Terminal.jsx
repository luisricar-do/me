import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { runCommand } from "../../lib/terminal"
import { evaluate } from "../../lib/aiRuler"
import { questions } from "../../data/aiRuler"
import { site } from "../../data/site"
import { useTheme } from "../../hooks/useTheme"

const LINE_CLASS = {
  out: "text-term-ink",
  muted: "text-term-muted",
  accent: "text-term-accent",
  error: "text-[#ff9a8b]",
  blank: "text-term-muted",
}

const PROMPT = { shell: "$", ruler: "ia>" }

let nextId = 0
const entry = (data) => ({ id: ++nextId, ...data })

function questionLines(step) {
  const question = questions[step]
  return [
    { kind: "out", text: `[${step + 1}/${questions.length}] ${question.question}` },
    ...question.options.map((option, i) => ({
      kind: "muted",
      text: `  ${i + 1}) ${option.label}`,
    })),
  ]
}

function verdictLines(result) {
  if (result.blocked) {
    return [
      ...result.blocked.flatMap((gate) => [
        { kind: "error", text: gate.title },
        { kind: "muted", text: gate.body },
        { kind: "blank", text: "" },
      ]),
      { kind: "muted", text: "nenhum nível de autonomia foi liberado." },
    ]
  }

  const level = result.levelInfo
  return [
    { kind: "accent", text: `nível ${level.code} · ${level.name.toLowerCase()}` },
    { kind: "out", text: level.motto },
    { kind: "muted", text: level.description },
    { kind: "muted", text: level.action },
    { kind: "blank", text: "" },
    { kind: "muted", text: `score ${result.score}/${result.max}` },
    ...(result.flags.length
      ? [
          { kind: "muted", text: "o que puxou para baixo:" },
          ...result.flags.map((flag) => ({ kind: "muted", text: `  - ${flag}` })),
        ]
      : []),
    { kind: "blank", text: "" },
    { kind: "muted", text: "versão completa, com card para compartilhar: /ia" },
  ]
}

/**
 * Terminal do hero. A abertura (o `cat ~/me.txt`) é dirigida pelo scroll;
 * a partir do primeiro clique ou tecla, vira um shell de verdade.
 */
export function Terminal({ typed, command, intro, onActivate }) {
  const [history, setHistory] = useState([])
  const [showIntro, setShowIntro] = useState(true)
  const [value, setValue] = useState("")
  const [mode, setMode] = useState("shell")
  const [ruler, setRuler] = useState({ step: 0, answers: {} })
  const [recall, setRecall] = useState([])
  const [recallAt, setRecallAt] = useState(-1)
  const [active, setActive] = useState(false)

  const inputRef = useRef(null)
  const scrollRef = useRef(null)
  const navigate = useNavigate()
  const { toggle } = useTheme()

  useEffect(() => {
    const box = scrollRef.current
    if (box) box.scrollTop = box.scrollHeight
  }, [history, showIntro])

  function activate() {
    if (active) return
    setActive(true)
    onActivate?.()
  }

  function push(...entries) {
    setHistory((current) => [...current, ...entries])
  }

  function applyEffect(effect) {
    if (!effect) return
    switch (effect.type) {
      case "clear":
        setHistory([])
        setShowIntro(false)
        break
      case "navigate":
        navigate(effect.to)
        break
      case "scroll":
        document.getElementById(effect.to)?.scrollIntoView({ block: "start" })
        break
      case "theme":
        toggle()
        break
      case "mail":
        window.location.href = `mailto:${site.email}`
        break
      case "ruler":
        setMode("ruler")
        setRuler({ step: 0, answers: {} })
        push(
          entry({
            kind: "lines",
            lines: [
              { kind: "accent", text: "régua de autonomia · 6 perguntas" },
              { kind: "muted", text: "responda 1, 2 ou 3. digite q para sair." },
              { kind: "blank", text: "" },
              ...questionLines(0),
            ],
          })
        )
        break
      default:
        break
    }
  }

  function submitShell(input) {
    const { lines, effect } = runCommand(input)
    if (lines.length) push(entry({ kind: "lines", lines }))
    applyEffect(effect)
  }

  function submitRuler(input) {
    const answer = input.trim().toLowerCase()

    if (answer === "q" || answer === "sair" || answer === "exit") {
      setMode("shell")
      push(entry({ kind: "lines", lines: [{ kind: "muted", text: "régua cancelada." }] }))
      return
    }

    const question = questions[ruler.step]
    const choice = Number(answer)
    if (!Number.isInteger(choice) || choice < 1 || choice > question.options.length) {
      push(
        entry({
          kind: "lines",
          lines: [
            { kind: "error", text: `resposta inválida: ${input.trim() || "(vazio)"}` },
            ...questionLines(ruler.step),
          ],
        })
      )
      return
    }

    const answers = { ...ruler.answers, [question.id]: choice - 1 }
    const step = ruler.step + 1

    if (step < questions.length) {
      setRuler({ step, answers })
      push(entry({ kind: "lines", lines: questionLines(step) }))
      return
    }

    setRuler({ step: 0, answers: {} })
    setMode("shell")
    push(entry({ kind: "lines", lines: verdictLines(evaluate(answers)) }))
  }

  function onSubmit(event) {
    event.preventDefault()
    const input = value
    push(entry({ kind: "command", prompt: PROMPT[mode], text: input }))
    setValue("")
    if (input.trim()) {
      setRecall((current) => [input, ...current].slice(0, 40))
      setRecallAt(-1)
    }
    if (mode === "ruler") submitRuler(input)
    else submitShell(input)
  }

  function onKeyDown(event) {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return
    if (!recall.length) return
    event.preventDefault()
    const next = event.key === "ArrowUp" ? recallAt + 1 : recallAt - 1
    if (next < 0) {
      setRecallAt(-1)
      setValue("")
      return
    }
    if (next >= recall.length) return
    setRecallAt(next)
    setValue(recall[next])
  }

  const introDone = typed.length >= command.length

  return (
    <div className="overflow-hidden rounded-xl border border-term-line bg-term shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-2 border-b border-term-line bg-term-head px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="flex-1 text-center font-mono text-[11px] text-term-muted">
          ~/me.txt · zsh
        </span>
      </div>

      <div
        ref={scrollRef}
        onClick={() => {
          if (window.getSelection()?.toString()) return
          activate()
          inputRef.current?.focus()
        }}
        className="h-[300px] cursor-text overflow-y-auto p-5 font-mono text-[13px] leading-6 md:h-[340px]"
      >
        {showIntro && (
          <>
            <p className="flex flex-wrap items-center">
              <span className="text-term-accent">{PROMPT.shell}&nbsp;</span>
              <span className="text-term-ink">{typed}</span>
              {!introDone && (
                <span className="terminal-cursor ml-0.5 inline-block h-3.5 w-1.5 bg-term-accent align-middle" />
              )}
            </p>
            <div className="mt-4 space-y-0.5">
              {intro.map((line, i) => (
                <p
                  key={i}
                  data-stage
                  style={{ "--stage-from": 0.2 + i * 0.028 }}
                  className={LINE_CLASS[line.kind]}
                >
                  {line.text || " "}
                </p>
              ))}
            </div>
          </>
        )}

        <div role="log" aria-live="polite" aria-label="Saída do terminal">
          {history.map((item) => (
            <div key={item.id} className="mt-3">
              {item.kind === "command" ? (
                <p>
                  <span className="text-term-accent">{item.prompt}&nbsp;</span>
                  <span className="text-term-ink">{item.text}</span>
                </p>
              ) : (
                <div className="space-y-0.5">
                  {item.lines.map((line, i) => (
                    <p
                      key={i}
                      className={`whitespace-pre-wrap break-words ${LINE_CLASS[line.kind]}`}
                    >
                      {line.text || " "}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={onSubmit} className="mt-3 flex items-baseline gap-2">
          <label htmlFor="terminal-input" className="shrink-0 text-term-accent">
            {PROMPT[mode]}
          </label>
          <input
            id="terminal-input"
            ref={inputRef}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={onKeyDown}
            onFocus={activate}
            autoComplete="off"
            spellCheck="false"
            aria-label="Digite um comando. Comece com help."
            placeholder={active ? "" : "digite help"}
            className="min-w-0 flex-1 bg-transparent text-term-ink caret-term-accent outline-none placeholder:text-term-muted/60"
          />
        </form>
      </div>
    </div>
  )
}
