import { useCallback, useEffect, useRef, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Moon, Search, Sun, X } from "lucide-react"
import { Mark } from "../ui/Mark"
import { Window } from "./Window"
import { Shell } from "./Shell"
import { StatusMenu } from "./StatusMenu"
import { APP, APPS, appForPath } from "./apps"
import { useNow } from "../../hooks/useNow"
import { useTheme } from "../../hooks/useTheme"
import { openCommandPalette } from "../../lib/palette"
import { clamp } from "../../lib/motion"
import { SIMPLE_BASE } from "../../lib/siteMode"

const DOCK_APPS = APPS.filter((app) => app.listed !== false && app.id !== "terminal")
const DESK_APPS = DOCK_APPS

const MENU_BAR = 36
const DOCK = 92
const HINT_KEY = "desktop-hint-seen"

function workArea() {
  return { w: window.innerWidth, h: window.innerHeight - MENU_BAR - DOCK }
}

/**
 * Posição inicial. A primeira janela abre grande e centralizada, para ser
 * lida sem precisar mexer em nada; as seguintes entram em cascata.
 */
function place(id, count, z) {
  const area = workArea()
  const [prefW, prefH] = APP[id].size
  const w = Math.min(prefW, area.w - 160)
  const h = Math.min(prefH, area.h - 24)
  const step = (count % 5) * 28
  return {
    x: clamp((area.w - w) / 2 + step, 120, Math.max(120, area.w - w - 16)),
    y: clamp(12 + step, 12, Math.max(12, area.h - h - 12)),
    w,
    h,
    z,
    maximized: false,
    minimized: false,
    minimizing: false,
    closing: false,
  }
}

function readHintSeen() {
  try {
    return localStorage.getItem(HINT_KEY) === "1"
  } catch {
    return false
  }
}

function saveHintSeen() {
  try {
    localStorage.setItem(HINT_KEY, "1")
  } catch {
    /* sem storage: a dica volta na próxima visita, nada de grave */
  }
}

/** Traz o app para a frente, abrindo a janela se ainda não existe. */
function bring(current, id) {
  const z = Math.max(0, ...Object.values(current).map((win) => win.z)) + 1
  const existing = current[id]
  if (existing) {
    return {
      ...current,
      [id]: { ...existing, z, minimized: false, minimizing: false, closing: false },
    }
  }
  return { ...current, [id]: place(id, Object.keys(current).length, z) }
}

function topOf(wins) {
  const visible = Object.entries(wins).filter(([, w]) => !w.minimized && !w.minimizing && !w.closing)
  return visible.sort((a, b) => b[1].z - a[1].z)[0]?.[0] ?? null
}

/**
 * A versão interativa no computador: o site como um sistema operacional.
 * Cada parte do site é uma janela, e a janela em foco é a URL: dá para
 * compartilhar /palestras e quem abrir cai com ela aberta.
 */
export function DesktopScreen() {
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  const [wins, setWins] = useState(() => {
    const first = appForPath(pathname) ?? "sobre"
    return { [first]: place(first, 0, 1) }
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const [hint, setHint] = useState(() => !readHintSeen())
  const { theme, toggle } = useTheme()

  // URL → janela: um link interno, a busca ou o voltar do browser abrem o app.
  // Ajustado no render, e não num efeito, para não pintar um quadro com a janela errada
  const [seenPath, setSeenPath] = useState(pathname)
  if (pathname !== seenPath) {
    setSeenPath(pathname)
    const id = appForPath(pathname)
    if (id && id !== topOf(wins)) setWins((current) => bring(current, id))
  }

  const visibleCount = Object.values(wins).filter((w) => !w.minimized && !w.minimizing && !w.closing).length
  const focusedId = topOf(wins)

  const dismissHint = useCallback(() => {
    setHint(false)
    saveHintSeen()
  }, [])

  const launch = useCallback(
    (id) => {
      if (!APP[id]) return
      dismissHint()
      setWins((current) => bring(current, id))
    },
    [dismissHint]
  )

  const patch = useCallback((id, changes) => {
    setWins((current) => (current[id] ? { ...current, [id]: { ...current[id], ...changes } } : current))
  }, [])

  // Janela em foco → URL. A régua guarda as respostas em ?r=, que só vale em /ia
  const rulerQuery = useRef(pathname === APP.regua.path ? search : "")
  const lastFocused = useRef(focusedId)
  useEffect(() => {
    if (lastFocused.current === focusedId) return
    if (lastFocused.current === "regua") rulerQuery.current = window.location.search
    lastFocused.current = focusedId
    const target = focusedId ? APP[focusedId].path : "/"
    if (target === window.location.pathname) return
    const query = focusedId === "regua" ? rulerQuery.current : ""
    navigate(`${target}${query}`, { replace: true })
  }, [focusedId, navigate])

  function focus(id) {
    if (id === focusedId) return
    setWins((current) => bring(current, id))
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
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event) => {
      if (event.key === "Escape" && !event.defaultPrevented) setMenuOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [menuOpen])

  const focusedApp = focusedId ? APP[focusedId] : null
  const nothingOpen = visibleCount === 0

  return (
    <div className="desk-enter desk-wallpaper fixed inset-0 overflow-hidden text-ink">
      {/* Barra de menu */}
      <header
        style={{ height: MENU_BAR }}
        className="relative z-[1001] flex items-center gap-1 border-b border-line-soft bg-surface/70 px-2 text-[13px] backdrop-blur-xl"
      >
        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          title="Novidades e atalhos"
          className={`flex h-7 items-center gap-2 rounded-md px-2 font-semibold transition-colors hover:bg-line-soft ${
            menuOpen ? "bg-line-soft" : ""
          }`}
        >
          <Mark size={15} />
          Luis Ricardo Santos
        </button>
        {focusedApp && <span className="px-2 text-ink-soft">{focusedApp.title}</span>}

        <div className="ml-auto flex items-center gap-1">
          <Link
            to={SIMPLE_BASE}
            title="Ler tudo numa página só, rolando"
            className="rounded-md px-2 py-1 text-ink-soft transition-colors hover:bg-line-soft hover:text-ink"
          >
            Versão simples
          </Link>
          <button
            type="button"
            onClick={openCommandPalette}
            aria-label="Buscar no site"
            title="Buscar no site (⌘K)"
            className="grid h-7 w-8 place-items-center rounded-md text-ink-soft transition-colors hover:bg-line-soft"
          >
            <Search size={14} />
          </button>
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
            title={theme === "dark" ? "Tema claro" : "Tema escuro"}
            className="grid h-7 w-8 place-items-center rounded-md text-ink-soft transition-colors hover:bg-line-soft"
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button
            type="button"
            onClick={() => launch("contato")}
            className="ml-1 rounded-full bg-accent px-3 py-1 text-[12.5px] font-medium text-accent-ink transition-opacity hover:opacity-90"
          >
            Fale comigo
          </button>
          <Clock />
        </div>
      </header>

      {menuOpen && (
        <>
          <button
            type="button"
            aria-label="Fechar menu"
            tabIndex={-1}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-[999] cursor-default"
          />
          <StatusMenu onClose={() => setMenuOpen(false)} onMinimizeAll={minimizeAll} />
        </>
      )}

      {/* Área de trabalho */}
      <main id="conteudo" className="absolute inset-x-0" style={{ top: MENU_BAR, bottom: DOCK }}>
        <h1 className="sr-only">Luis Ricardo Santos · Governança de TI e IA</h1>

        {nothingOpen && (
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <div className="text-center">
              <Mark size={120} className="mx-auto text-ink opacity-[0.08]" />
              <p className="mt-6 text-sm text-muted">Clique em um ícone para abrir.</p>
            </div>
          </div>
        )}

        <nav aria-label="Atalhos" className="absolute left-3 top-3">
          <ul className="flex flex-col gap-1">
            {DESK_APPS.map((app) => {
              const Icon = app.icon
              return (
                <li key={app.id}>
                  <button
                    type="button"
                    onClick={() => launch(app.id)}
                    className="group flex w-24 flex-col items-center gap-1.5 rounded-lg p-2 text-center transition-colors hover:bg-surface/60"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-line bg-surface text-ink-soft shadow-sm transition-colors group-hover:border-accent group-hover:text-accent">
                      <Icon size={22} />
                    </span>
                    <span className="text-[12px] leading-tight text-ink-soft group-hover:text-ink">
                      {app.title}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {Object.entries(wins).map(([id, state]) => {
          const app = APP[id]
          const View = app.View
          return (
            <Window
              key={id}
              app={app}
              state={state}
              focused={id === focusedId}
              onFocus={() => focus(id)}
              onMove={(x, y) => patch(id, { x, y })}
              onClose={() => patch(id, { closing: true })}
              onMinimize={() => patch(id, { minimizing: true })}
              onMaximize={() => patch(id, { maximized: !state.maximized })}
              onAnimationDone={() => onAnimationDone(id)}
            >
              {id === "terminal" ? (
                <Shell
                  onLaunch={launch}
                  onExit={() => patch("terminal", { closing: true })}
                  onSimple={() => navigate(SIMPLE_BASE)}
                  onTheme={toggle}
                />
              ) : (
                <View />
              )}
            </Window>
          )
        })}
      </main>

      {hint && (
        <div
          role="status"
          className="desk-pop absolute bottom-[104px] left-1/2 z-[1002] flex w-[min(26rem,calc(100vw-2rem))] -translate-x-1/2 items-start gap-3 rounded-xl border border-line bg-surface p-4 shadow-[var(--shadow-card)]"
        >
          <div className="min-w-0 flex-1 text-sm">
            <p className="font-medium text-ink">Este site funciona como um computador.</p>
            <p className="mt-1 text-pretty text-muted">
              Clique nos ícones aqui embaixo ou ao lado para abrir cada parte. As janelas podem
              ser arrastadas, minimizadas e fechadas.
            </p>
          </div>
          <button
            type="button"
            onClick={dismissHint}
            aria-label="Fechar dica"
            className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-muted transition-colors hover:bg-line-soft hover:text-ink"
          >
            <X size={15} />
          </button>
          <span
            aria-hidden
            className="absolute -bottom-[7px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-line bg-surface"
          />
        </div>
      )}

      {/* Dock */}
      <nav
        aria-label="Apps"
        className="absolute bottom-3 left-1/2 z-[1000] max-w-[calc(100vw-1rem)] -translate-x-1/2"
      >
        <ul className="flex items-end gap-1.5 rounded-2xl border border-line bg-surface/70 px-2.5 pb-2 pt-2.5 shadow-[var(--shadow-card)] backdrop-blur-xl">
          {DOCK_APPS.map((app) => (
            <DockItem
              key={app.id}
              app={app}
              focused={app.id === focusedId}
              running={Boolean(wins[app.id] && !wins[app.id].closing)}
              onClick={() => onDockClick(app.id)}
            />
          ))}
          <li aria-hidden className="mx-1 h-9 w-px self-center bg-line" />
          <DockItem
            app={APP.terminal}
            focused={focusedId === "terminal"}
            running={Boolean(wins.terminal && !wins.terminal.closing)}
            onClick={() => onDockClick("terminal")}
          />
        </ul>
      </nav>
    </div>
  )
}

function DockItem({ app, focused, running, onClick }) {
  const Icon = app.icon
  return (
    <li className="group relative shrink-0">
      <button
        type="button"
        onClick={onClick}
        aria-label={`${app.title}: ${app.hint}`}
        className={`dock-item grid h-12 w-12 place-items-center rounded-xl border transition-colors ${
          focused
            ? "border-accent bg-accent-tint text-accent"
            : "border-line-soft bg-surface-2 text-ink-soft hover:text-accent"
        }`}
      >
        <Icon size={22} />
      </button>
      {/* Balão com o nome: o mesmo que o dock do Mac mostra ao passar o mouse */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 whitespace-nowrap rounded-lg border border-line bg-surface px-2.5 py-1.5 text-center opacity-0 shadow-[var(--shadow-card)] transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
      >
        <span className="block text-[12.5px] font-medium text-ink">{app.title}</span>
        <span className="block text-[11px] text-muted">{app.hint}</span>
      </span>
      <span
        aria-hidden
        className={`absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-ink-soft transition-opacity ${
          running ? "opacity-100" : "opacity-0"
        }`}
      />
    </li>
  )
}

const dayFormat = new Intl.DateTimeFormat("pt-BR", { weekday: "short", day: "numeric", month: "short" })
const timeFormat = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" })

/** Isolado para que o tique do relógio não re-renderize o desktop inteiro. */
function Clock() {
  const now = useNow()
  // "qui., 2 de out." → "qui 2 out", como na barra de menu do macOS
  const day = dayFormat.format(now).replace(/[.,]/g, "").replace(/ de /g, " ")
  return (
    <span className="whitespace-nowrap px-2 tabular-nums text-ink-soft">
      <span className="hidden lg:inline">{day}&nbsp;&nbsp;</span>
      {timeFormat.format(now)}
    </span>
  )
}
