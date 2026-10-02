import { useCallback, useEffect, useRef, useState } from "react"
import { useLocation, useSearchParams } from "react-router-dom"
import {
  BookOpen,
  FileText,
  History,
  LogOut,
  Mail,
  Mic,
  Moon,
  Search,
  Sun,
  SquareTerminal,
} from "lucide-react"
import { Mark } from "../ui/Mark"
import { Window } from "./Window"
import { Shell } from "./Shell"
import { StatusMenu } from "./StatusMenu"
import {
  AboutView,
  ContactView,
  HighlightsView,
  RulerView,
  TalksView,
  TimelineView,
} from "./AppViews"
import { useNow } from "../../hooks/useNow"
import { useTheme } from "../../hooks/useTheme"
import { openCommandPalette } from "../../lib/palette"
import { clamp } from "../../lib/motion"

const RulerIcon = ({ size }) => <Mark size={size} />

/** Ordem do dock. `size` é o tamanho preferido da janela, [largura, altura]. */
const APPS = [
  { id: "terminal", title: "Terminal", file: "~ · zsh", icon: SquareTerminal, size: [600, 380] },
  { id: "sobre", title: "Sobre", file: "~/me.txt", icon: FileText, size: [540, 560], View: AboutView },
  { id: "palestras", title: "Palestras", file: "~/palestras.md", icon: Mic, size: [580, 600], View: TalksView },
  { id: "regua", title: "Régua de IA", file: "~/regua.app", icon: RulerIcon, size: [680, 640], View: RulerView },
  { id: "trajetoria", title: "Trajetória", file: "~/trajetoria.md", icon: History, size: [560, 620], View: TimelineView },
  { id: "destaques", title: "Publicações", file: "~/publicacoes.md", icon: BookOpen, size: [560, 520], View: HighlightsView },
  { id: "contato", title: "Contato", file: "~/contato", icon: Mail, size: [480, 520], View: ContactView },
]

const APP = Object.fromEntries(APPS.map((app) => [app.id, app]))

/** Atalhos no canto do desktop, como arquivos soltos na mesa. */
const DESK_ICONS = [
  { id: "sobre", label: "me.txt" },
  { id: "regua", label: "regua.app" },
  { id: "palestras", label: "palestras.md" },
  { id: "contato", label: "contato" },
]

const MENU_BAR = 32
const DOCK = 80

function workArea() {
  return { w: window.innerWidth, h: window.innerHeight - MENU_BAR - DOCK }
}

/** Posição inicial: centralizada, em cascata conforme o número de janelas abertas. */
function place(id, count, z) {
  const area = workArea()
  const [prefW, prefH] = APP[id].size
  const w = Math.min(prefW, area.w - 32)
  const h = Math.min(prefH, area.h - 24)
  const step = (count % 5) * 28
  return {
    x: clamp((area.w - w) / 2 - 56 + step, 16, Math.max(16, area.w - w - 16)),
    y: clamp(16 + step, 12, Math.max(12, area.h - h - 12)),
    w,
    h,
    z,
    maximized: false,
    minimized: false,
    minimizing: false,
    closing: false,
  }
}

/** Abre já com duas janelas lado a lado, para o desktop não nascer vazio. */
function initialWindows() {
  const terminal = place("terminal", 0, 1)
  if (window.matchMedia("(max-width: 767px)").matches) return { terminal }

  const sobre = place("sobre", 1, 2)
  const area = workArea()
  const gap = 24
  if (area.w >= sobre.w + terminal.w + gap + 160) {
    sobre.x = (area.w - sobre.w - terminal.w - gap) / 2 - 40
    sobre.y = 24
    terminal.x = sobre.x + sobre.w + gap
    terminal.y = 88
  }
  return { terminal, sobre }
}

function useCompact() {
  const query = "(max-width: 767px)"
  const [compact, setCompact] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const media = window.matchMedia(query)
    const onChange = () => setCompact(media.matches)
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [])
  return compact
}

/**
 * Modo desktop: o site como um sistema operacional. Fica escondido atrás do
 * comando `desktop` no terminal e da paleta ⌘K; a home continua sendo a
 * porta de entrada normal.
 */
export function Desktop() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const show = () => setOpen(true)
    const hide = () => setOpen(false)
    window.addEventListener("desktop:open", show)
    window.addEventListener("desktop:close", hide)
    return () => {
      window.removeEventListener("desktop:open", show)
      window.removeEventListener("desktop:close", hide)
    }
  }, [])

  if (!open) return null
  return <DesktopScreen onExit={() => setOpen(false)} />
}

function DesktopScreen({ onExit }) {
  const [wins, setWins] = useState(initialWindows)
  const [menuOpen, setMenuOpen] = useState(false)
  const zTop = useRef(2)
  const rootRef = useRef(null)
  const compact = useCompact()
  const { theme, toggle } = useTheme()
  const { pathname } = useLocation()
  const [params, setParams] = useSearchParams()

  const visible = Object.entries(wins).filter(([, w]) => !w.minimized && !w.closing)
  const focusedId = visible.sort((a, b) => b[1].z - a[1].z)[0]?.[0]

  const launch = useCallback((id) => {
    if (!APP[id]) return
    const z = ++zTop.current
    setWins((current) => {
      const existing = current[id]
      if (existing) {
        return {
          ...current,
          [id]: { ...existing, z, minimized: false, minimizing: false, closing: false },
        }
      }
      return { ...current, [id]: place(id, Object.keys(current).length, z) }
    })
  }, [])

  const patch = useCallback((id, changes) => {
    setWins((current) => (current[id] ? { ...current, [id]: { ...current[id], ...changes } } : current))
  }, [])

  const exit = useCallback(() => {
    // A régua grava as respostas na URL; fora da página dela isso é só ruído
    if (pathname !== "/ia" && params.has("r")) {
      const next = new URLSearchParams(params)
      next.delete("r")
      setParams(next, { replace: true })
    }
    onExit()
  }, [onExit, params, pathname, setParams])

  function focus(id) {
    if (id === focusedId) return
    patch(id, { z: ++zTop.current })
  }

  function onDockClick(id) {
    const win = wins[id]
    if (!win || win.minimized || win.closing) launch(id)
    else if (id === focusedId) patch(id, { minimizing: true })
    else focus(id)
  }

  function onAnimationDone(id) {
    setWins((current) => {
      const win = current[id]
      if (!win) return current
      if (win.closing) {
        const rest = { ...current }
        delete rest[id]
        return rest
      }
      if (win.minimizing) return { ...current, [id]: { ...win, minimizing: false, minimized: true } }
      return current
    })
  }

  function minimizeAll() {
    setWins((current) =>
      Object.fromEntries(
        Object.entries(current).map(([id, win]) => [id, win.minimized ? win : { ...win, minimizing: true }])
      )
    )
  }

  useEffect(() => {
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    rootRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      previousFocus?.focus?.()
    }
  }, [])

  useEffect(() => {
    const onKey = (event) => {
      // A paleta ⌘K fica por cima e consome o próprio esc com preventDefault
      if (event.key !== "Escape" || event.defaultPrevented) return
      if (menuOpen) setMenuOpen(false)
      else exit()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [menuOpen, exit])

  const focusedApp = focusedId ? APP[focusedId] : null

  return (
    <div
      ref={rootRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="Modo desktop"
      className="desk-enter desk-wallpaper fixed inset-0 z-[85] overflow-hidden text-ink outline-none"
    >
      {/* Menu bar */}
      <header
        style={{ height: MENU_BAR }}
        className="relative z-[1001] flex items-center gap-1 border-b border-line-soft bg-surface/70 px-2 text-[13px] backdrop-blur-xl"
      >
        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          aria-label="Status"
          className={`grid h-6 w-8 place-items-center rounded-md transition-colors hover:bg-line-soft ${
            menuOpen ? "bg-line-soft" : ""
          }`}
        >
          <Mark size={15} />
        </button>
        <span className="px-2 font-semibold">{focusedApp?.title ?? "Luis Ricardo"}</span>
        <button
          type="button"
          onClick={exit}
          className="hidden rounded-md px-2 py-0.5 text-ink-soft transition-colors hover:bg-line-soft sm:inline"
        >
          Sair do desktop
        </button>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={openCommandPalette}
            aria-label="Buscar (⌘K)"
            title="Buscar (⌘K)"
            className="grid h-6 w-7 place-items-center rounded-md text-ink-soft transition-colors hover:bg-line-soft"
          >
            <Search size={14} />
          </button>
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
            className="grid h-6 w-7 place-items-center rounded-md text-ink-soft transition-colors hover:bg-line-soft"
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <Clock />
        </div>
      </header>

      {menuOpen && (
        <>
          <button
            type="button"
            aria-label="Fechar status"
            tabIndex={-1}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-[999] cursor-default"
          />
          <StatusMenu onClose={() => setMenuOpen(false)} onMinimizeAll={minimizeAll} />
        </>
      )}

      {/* Área de trabalho */}
      <div className="absolute inset-x-0" style={{ top: MENU_BAR, bottom: DOCK }}>
        <Mark
          size={220}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-ink opacity-[0.05]"
        />

        {!compact && (
          <ul className="absolute right-4 top-4 flex flex-col gap-3">
            {DESK_ICONS.map(({ id, label }) => {
              const Icon = APP[id].icon
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => launch(id)}
                    className="group flex w-20 flex-col items-center gap-1.5 rounded-lg p-1.5 text-center"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-surface/80 text-ink-soft shadow-sm transition-colors group-hover:border-accent group-hover:text-accent">
                      <Icon size={22} />
                    </span>
                    <span className="rounded px-1 font-mono text-[11px] text-ink-soft group-hover:bg-accent group-hover:text-accent-ink">
                      {label}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        )}

        {Object.entries(wins).map(([id, state]) => {
          const app = APP[id]
          const View = app.View
          return (
            <Window
              key={id}
              app={app}
              state={state}
              compact={compact}
              focused={id === focusedId}
              onFocus={() => focus(id)}
              onMove={(x, y) => patch(id, { x, y })}
              onClose={() => patch(id, { closing: true })}
              onMinimize={() => patch(id, { minimizing: true })}
              onMaximize={() => patch(id, { maximized: !state.maximized })}
              onAnimationDone={() => onAnimationDone(id)}
            >
              {id === "terminal" ? <Shell onLaunch={launch} onExit={exit} onTheme={toggle} /> : <View />}
            </Window>
          )
        })}
      </div>

      {/* Dock */}
      <nav
        aria-label="Dock"
        className="absolute bottom-3 left-1/2 z-[1000] max-w-[calc(100vw-1rem)] -translate-x-1/2"
      >
        <ul className="flex items-end gap-1 overflow-x-auto md:gap-1.5 rounded-2xl border border-line bg-surface/70 px-2 pb-2 pt-2 shadow-[var(--shadow-card)] backdrop-blur-xl">
          {APPS.map((app) => {
            const win = wins[app.id]
            const running = Boolean(win && !win.closing)
            const Icon = app.icon
            return (
              <li key={app.id} className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => onDockClick(app.id)}
                  aria-label={app.title}
                  title={app.title}
                  className={`dock-item grid h-10 w-10 md:h-11 md:w-11 place-items-center rounded-xl border transition-colors ${
                    app.id === focusedId
                      ? "border-accent bg-accent-tint text-accent"
                      : "border-line-soft bg-surface-2 text-ink-soft hover:text-accent"
                  }`}
                >
                  <Icon size={20} />
                </button>
                <span
                  aria-hidden
                  className={`absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-ink-soft transition-opacity ${
                    running ? "opacity-100" : "opacity-0"
                  }`}
                />
              </li>
            )
          })}
          <li aria-hidden className="mx-0.5 h-8 md:mx-1 md:h-9 w-px self-center bg-line" />
          <li className="shrink-0">
            <button
              type="button"
              onClick={exit}
              aria-label="Sair do desktop"
              title="Sair do desktop (esc)"
              className="dock-item grid h-10 w-10 md:h-11 md:w-11 place-items-center rounded-xl border border-line-soft bg-surface-2 text-ink-soft hover:text-accent"
            >
              <LogOut size={19} />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

const dayFormat = new Intl.DateTimeFormat("pt-BR", { weekday: "short", day: "numeric", month: "short" })
const timeFormat = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" })

/** Isolado para que o tique do relógio não re-renderize o desktop inteiro. */
function Clock() {
  const now = useNow()
  // "qui., 2 de out." → "qui 2 out", como na menu bar do macOS
  const day = dayFormat.format(now).replace(/[.,]/g, "").replace(/ de /g, " ")
  return (
    <span className="whitespace-nowrap px-2 tabular-nums text-ink-soft">
      <span className="hidden sm:inline">{day}&nbsp;&nbsp;</span>
      {timeFormat.format(now)}
    </span>
  )
}
