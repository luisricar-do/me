import { useEffect, useMemo, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { CornerDownLeft, Search } from "lucide-react"
import { buildIndex, search } from "../../lib/searchIndex"
import { useTheme } from "../../hooks/useTheme"

const index = buildIndex()

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [cursor, setCursor] = useState(0)

  const inputRef = useRef(null)
  const listRef = useRef(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { toggle } = useTheme()

  const results = useMemo(() => search(index, query), [query])
  const active = results.length ? Math.min(cursor, results.length - 1) : 0

  useEffect(() => {
    const show = () => {
      setQuery("")
      setCursor(0)
      setOpen(true)
    }

    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setQuery("")
        setCursor(0)
        setOpen((current) => !current)
      }
    }

    window.addEventListener("keydown", onKey)
    window.addEventListener("palette:open", show)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("palette:open", show)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const frame = requestAnimationFrame(() => inputRef.current?.focus())
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      cancelAnimationFrame(frame)
      document.body.style.overflow = previous
    }
  }, [open])

  useEffect(() => {
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: "nearest" })
  }, [active, results])

  function run(item) {
    setOpen(false)
    const { action } = item

    switch (action.type) {
      case "scroll":
        if (pathname === "/") {
          document.getElementById(action.to)?.scrollIntoView({ block: "start" })
        } else {
          navigate(`/#${action.to}`)
        }
        break
      case "route":
        navigate(action.to)
        break
      case "external":
        window.open(action.to, "_blank", "noopener,noreferrer")
        break
      case "theme":
        toggle()
        break
      case "copy":
        navigator.clipboard?.writeText(action.value).catch(() => {})
        break
      default:
        break
    }
  }

  function onKeyDown(event) {
    if (event.key === "Escape") {
      event.preventDefault()
      setOpen(false)
      return
    }
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setCursor((current) => (results.length ? (current + 1) % results.length : 0))
      return
    }
    if (event.key === "ArrowUp") {
      event.preventDefault()
      setCursor((current) => (results.length ? (current - 1 + results.length) % results.length : 0))
      return
    }
    if (event.key === "Enter" && results[active]) {
      event.preventDefault()
      run(results[active])
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Buscar no site"
    >
      <button
        type="button"
        aria-label="Fechar busca"
        onClick={() => setOpen(false)}
        className="absolute inset-0 cursor-default bg-paper/70 backdrop-blur-sm"
      />

      <div className="fade-swap relative w-full max-w-xl overflow-hidden rounded-xl border border-line bg-surface shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search size={16} className="shrink-0 text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setCursor(0)
            }}
            onKeyDown={onKeyDown}
            placeholder="Buscar seções, palestras, artigos, projetos..."
            aria-label="Buscar"
            autoComplete="off"
            spellCheck="false"
            className="min-w-0 flex-1 bg-transparent py-4 text-ink caret-accent outline-none placeholder:text-muted"
          />
        </div>

        <div ref={listRef} className="max-h-[52vh] overflow-y-auto overscroll-contain py-2">
          {results.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-muted">Nada encontrado.</p>
          )}

          {results.map((item, position) => (
            <button
              key={item.id}
              type="button"
              data-active={position === active}
              onMouseMove={() => setCursor(position)}
              onClick={() => run(item)}
              className={`flex w-full items-baseline gap-4 px-4 py-2.5 text-left transition-colors ${
                position === active ? "bg-accent-tint" : ""
              }`}
            >
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm text-ink">{item.label}</span>
                <span className="mt-0.5 block truncate font-mono text-[11px] text-muted">
                  {item.hint}
                </span>
              </span>
              <span className="label shrink-0 text-muted">{item.group}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[10px] text-muted">
          <span className="inline-flex items-center gap-1.5">
            <CornerDownLeft size={11} />
            abrir
          </span>
          <span>↑↓ navegar</span>
          <span>esc fechar</span>
        </div>
      </div>
    </div>
  )
}
