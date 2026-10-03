import { useEffect, useRef, useState } from "react"
import { LINE_CLASS, runCommand } from "../../lib/terminal"
import { SECTION_APP } from "../../lib/desktop"

let nextId = 0

const WELCOME = [
  { kind: "accent", text: "luisr.com.br · terminal" },
  { kind: "muted", text: "os mesmos comandos do terminal da versão simples." },
  { kind: "muted", text: "open <seção> abre a janela dela. comece com help." },
]

/**
 * O terminal da versão interativa. Reaproveita o interpretador da versão
 * simples, mas os efeitos viram ações de app: "open palestras" abre a
 * janela (ou a tela, no celular) em vez de rolar uma página.
 * `onExit` fecha o próprio terminal; `onSimple` vai para a versão simples.
 */
export function Shell({ onLaunch, onExit, onSimple, onTheme }) {
  const [history, setHistory] = useState([{ id: ++nextId, lines: WELCOME }])
  const [value, setValue] = useState("")
  const inputRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    const box = scrollRef.current
    if (box) box.scrollTop = box.scrollHeight
  }, [history])

  function apply(effect) {
    switch (effect?.type) {
      case "clear":
        setHistory([])
        break
      case "scroll":
        onLaunch(SECTION_APP[effect.to])
        break
      case "navigate":
      case "ruler":
        onLaunch("regua")
        break
      case "theme":
        onTheme()
        break
      case "mail":
        onLaunch("contato")
        break
      case "collapse":
        onExit()
        break
      case "simple":
        onSimple()
        break
      default:
        break
    }
  }

  function onSubmit(event) {
    event.preventDefault()
    const input = value
    setValue("")
    const { lines, effect } = runCommand(input)
    const shown =
      effect?.type === "desktop"
        ? [{ kind: "muted", text: "você já está na versão interativa." }]
        : effect?.type === "expand"
          ? [{ kind: "muted", text: "use o botão verde da janela para maximizar." }]
          : effect?.type === "collapse"
            ? [{ kind: "muted", text: "fechando o terminal." }]
            : lines
    setHistory((current) => [...current, { id: ++nextId, command: input, lines: shown }])
    apply(effect)
  }

  return (
    <div
      ref={scrollRef}
      onClick={() => {
        if (!window.getSelection()?.toString()) inputRef.current?.focus()
      }}
      className="h-full cursor-text overflow-y-auto bg-term p-4 font-mono text-[12.5px] leading-6"
    >
      <div role="log" aria-live="polite" aria-label="Saída do terminal">
        {history.map((item) => (
          <div key={item.id} className="mt-2 first:mt-0">
            {item.command !== undefined && (
              <p>
                <span className="text-term-accent">$&nbsp;</span>
                <span className="text-term-ink">{item.command}</span>
              </p>
            )}
            {item.lines.map((line, i) => (
              <p key={i} className={`whitespace-pre-wrap break-words ${LINE_CLASS[line.kind]}`}>
                {line.text || " "}
              </p>
            ))}
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="mt-2 flex items-baseline gap-2">
        <label htmlFor="desktop-shell" className="shrink-0 text-term-accent">
          $
        </label>
        <input
          id="desktop-shell"
          ref={inputRef}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          autoComplete="off"
          spellCheck="false"
          aria-label="Digite um comando. Comece com help."
          placeholder="digite help"
          className="min-w-0 flex-1 bg-transparent text-term-ink caret-term-accent outline-none placeholder:text-term-muted/60"
        />
      </form>
    </div>
  )
}
