import { useCallback, useEffect, useRef, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Moon, Search, Sun, X } from "lucide-react"
import { Mark } from "../ui/Mark"
import { Window } from "./Window"
import { Shell } from "./Shell"
import { StatusMenu } from "./StatusMenu"
import { Wallpaper } from "./Wallpaper"
import { Widgets } from "./Widgets"
import { Boot, ContextMenu, Screensaver, Toast } from "./Overlays"
import { APP, APPS, appForPath } from "./apps"
import { publications } from "../../data/publications"
import { useNow } from "../../hooks/useNow"
import { useTheme } from "../../hooks/useTheme"
import { openCommandPalette } from "../../lib/palette"
import { clamp } from "../../lib/motion"
import { SIMPLE_BASE } from "../../lib/siteMode"
import {
  markSeenThisSession,
  readLayout,
  readWallpaper,
  saveLayout,
  saveWallpaper,
  seenThisSession,
} from "../../lib/desktopPrefs"
import { DEFAULT_WALLPAPER, WALLPAPERS, isWallpaper } from "../../lib/wallpapers"

// Arquivos abre o dock, como o Finder; terminal e lixeira ficam depois do separador
const SPECIAL = new Set(["arquivos", "terminal", "lixeira"])
const CONTENT_APPS = APPS.filter((app) => app.listed !== false && !SPECIAL.has(app.id))
const DOCK_APPS = [APP.arquivos, ...CONTENT_APPS]
const DESK_APPS = [APP.arquivos, ...CONTENT_APPS]

const MENU_BAR = 36
const DOCK = 92
const HINT_KEY = "desktop-hint-seen"
const BOOT_KEY = "desktop-booted"
const TOAST_KEY = "desktop-toast"
const IDLE_MS = 120_000
const GAP = 8

// Cache das posições salvas: lido do storage uma vez, atualizado a cada mudança
let savedLayout = null
function getLayout() {
  savedLayout ??= readLayout()
  return savedLayout
}

const latestPaper = [...publications].sort((a, b) => b.date.localeCompare(a.date))[0]

function workArea() {
  return { w: window.innerWidth, h: window.innerHeight - MENU_BAR - DOCK }
}

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/** Meia tela à esquerda ou à direita, com uma margem para a sombra respirar. */
function snapRect(zone, area = workArea()) {
  const half = Math.floor(area.w / 2)
  return {
    x: zone === "left" ? GAP : half + GAP / 2,
    y: GAP,
    w: half - GAP * 1.5,
    h: area.h - GAP * 2,
  }
}

/** A posição salva na última visita, se ela ainda couber nesta tela. */
function fromSaved(saved, area) {
  if (!saved) return null
  if (saved.snapped) return { ...snapRect(saved.snapped, area), snapped: saved.snapped, restore: saved.restore }
  const { x, y, w, h } = saved
  if (![x, y, w, h].every(Number.isFinite) || w > area.w || h > area.h) return null
  return {
    x: clamp(x, 96 - w, area.w - 96),
    y: clamp(y, 0, Math.max(0, area.h - 40)),
    w,
    h,
    maximized: Boolean(saved.maximized),
  }
}

/**
 * Posição inicial. Se a janela já foi aberta antes, volta para onde estava;
 * senão a primeira abre grande e centralizada e as seguintes entram em cascata.
 */
function place(id, count, z, layout) {
  const area = workArea()
  const base = { z, maximized: false, minimized: false, minimizing: false, closing: false, snapped: null, restore: null }
  const saved = fromSaved(layout[id], area)
  if (saved) return { ...base, ...saved }
  const [prefW, prefH] = APP[id].size
  const w = Math.min(prefW, area.w - 160)
  const h = Math.min(prefH, area.h - 24)
  const step = (count % 5) * 28
  return {
    ...base,
    x: clamp((area.w - w) / 2 + step, 120, Math.max(120, area.w - w - 16)),
    y: clamp(12 + step, 12, Math.max(12, area.h - h - 12)),
    w,
    h,
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
function bring(current, id, layout) {
  const z = Math.max(0, ...Object.values(current).map((win) => win.z)) + 1
  const existing = current[id]
  if (existing) {
    return {
      ...current,
      [id]: { ...existing, z, minimized: false, minimizing: false, closing: false },
    }
  }
  return { ...current, [id]: place(id, Object.keys(current).length, z, layout) }
}

function isVisible(win) {
  return !win.minimized && !win.minimizing && !win.closing
}

function topOf(wins) {
  const visible = Object.entries(wins).filter(([, w]) => isVisible(w))
  return visible.sort((a, b) => b[1].z - a[1].z)[0]?.[0] ?? null
}

/** Em campo de texto, ⌥ + letra escreve caractere; atalho só fora dele, salvo no terminal. */
function typingIn(target) {
  if (!(target instanceof HTMLElement)) return false
  if (target.closest("#desktop-shell")) return false
  return target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)
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
    return { [first]: place(first, 0, 1, getLayout()) }
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const [hint, setHint] = useState(() => !readHintSeen())
  const [wallpaper, setWallpaper] = useState(() => {
    const saved = readWallpaper(DEFAULT_WALLPAPER)
    return isWallpaper(saved) ? saved : DEFAULT_WALLPAPER
  })
  const [snapPreview, setSnapPreview] = useState(null)
  const [contextMenu, setContextMenu] = useState(null)
  const [booting, setBooting] = useState(() => !reducedMotion() && !seenThisSession(BOOT_KEY))
  const [toast, setToast] = useState(false)
  const [saver, setSaver] = useState(false)
  const { theme, toggle } = useTheme()

  // URL → janela: um link interno, a busca ou o voltar do browser abrem o app.
  // Ajustado no render, e não num efeito, para não pintar um quadro com a janela errada
  const [seenPath, setSeenPath] = useState(pathname)
  if (pathname !== seenPath) {
    setSeenPath(pathname)
    const id = appForPath(pathname)
    if (id && id !== topOf(wins)) setWins((current) => bring(current, id, getLayout()))
  }

  const visibleCount = Object.values(wins).filter(isVisible).length
  const focusedId = topOf(wins)

  const dismissHint = useCallback(() => {
    setHint(false)
    saveHintSeen()
  }, [])

  const launch = useCallback(
    (id) => {
      if (!APP[id]) return
      dismissHint()
      setWins((current) => bring(current, id, getLayout()))
    },
    [dismissHint]
  )

  const patch = useCallback((id, changes) => {
    setWins((current) => (current[id] ? { ...current, [id]: { ...current[id], ...changes } } : current))
  }, [])

  const snap = useCallback((id, zone) => {
    setWins((current) => {
      const win = current[id]
      if (!win) return current
      if (zone === "top") return { ...current, [id]: { ...win, maximized: true } }
      const restore = win.snapped ? win.restore : { x: win.x, y: win.y, w: win.w, h: win.h }
      return { ...current, [id]: { ...win, ...snapRect(zone), maximized: false, snapped: zone, restore } }
    })
  }, [])

  const restore = useCallback((id) => {
    setWins((current) => {
      const win = current[id]
      if (!win) return current
      if (win.maximized) return { ...current, [id]: { ...win, maximized: false } }
      if (win.snapped && win.restore) {
        return { ...current, [id]: { ...win, ...win.restore, snapped: null, restore: null } }
      }
      return current
    })
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

  // Posição e tamanho de cada janela ficam para a próxima visita
  useEffect(() => {
    const next = { ...getLayout() }
    for (const [id, win] of Object.entries(wins)) {
      if (win.closing) continue
      next[id] = { x: win.x, y: win.y, w: win.w, h: win.h, maximized: win.maximized, snapped: win.snapped, restore: win.restore }
    }
    savedLayout = next
    saveLayout(next)
  }, [wins])

  function focus(id) {
    if (id === focusedId) return
    setWins((current) => bring(current, id, getLayout()))
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

  const minimizeAll = useCallback(() => {
    setWins((current) =>
      Object.fromEntries(
        Object.entries(current).map(([id, win]) => [id, win.minimized ? win : { ...win, minimizing: true }])
      )
    )
  }, [])

  /** Organiza as janelas abertas numa grade que ocupa a mesa inteira. */
  const tileAll = useCallback(() => {
    setWins((current) => {
      const ids = Object.keys(current).filter((id) => isVisible(current[id]))
      if (!ids.length) return current
      const area = workArea()
      const cols = Math.ceil(Math.sqrt(ids.length))
      const rows = Math.ceil(ids.length / cols)
      const w = Math.floor((area.w - GAP * (cols + 1)) / cols)
      const h = Math.floor((area.h - GAP * (rows + 1)) / rows)
      const next = { ...current }
      ids.forEach((id, index) => {
        const col = index % cols
        const row = Math.floor(index / cols)
        next[id] = {
          ...current[id],
          x: GAP + col * (w + GAP),
          y: GAP + row * (h + GAP),
          w,
          h,
          maximized: false,
          snapped: null,
          restore: null,
        }
      })
      return next
    })
  }, [])

  function chooseWallpaper(id) {
    setWallpaper(id)
    saveWallpaper(id)
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

  // Atalhos com ⌥ (Option/Alt): ⌘W e ⌘M são do navegador e não dá para tomar
  useEffect(() => {
    const onKey = (event) => {
      if (!event.altKey || event.metaKey || event.ctrlKey || typingIn(event.target)) return
      const id = focusedId
      const actions = {
        KeyW: () => id && patch(id, { closing: true }),
        KeyM: () => id && patch(id, { minimizing: true }),
        ArrowLeft: () => id && snap(id, "left"),
        ArrowRight: () => id && snap(id, "right"),
        ArrowUp: () => id && (wins[id].maximized ? restore(id) : snap(id, "top")),
        ArrowDown: () => id && restore(id),
        KeyT: () => launch("terminal"),
        KeyF: () => launch("arquivos"),
        KeyO: () => tileAll(),
        Tab: () => cycle(),
        Backquote: () => cycle(),
      }
      const action = actions[event.code]
      if (!action) return
      event.preventDefault()
      action()
    }
    // Manda para a frente a janela que está mais ao fundo: repetir percorre todas
    function cycle() {
      const visible = Object.entries(wins).filter(([, win]) => isVisible(win))
      if (visible.length < 2) return
      const [bottom] = visible.sort((a, b) => a[1].z - b[1].z)[0]
      setWins((current) => bring(current, bottom, getLayout()))
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [focusedId, wins, patch, snap, restore, launch, tileAll])

  // Notificação: uma por sessão, logo depois do boot
  const closeToast = useCallback(() => setToast(false), [])
  useEffect(() => {
    if (booting || !latestPaper || seenThisSession(TOAST_KEY)) return
    const id = setTimeout(() => {
      markSeenThisSession(TOAST_KEY)
      setToast(true)
    }, 1400)
    return () => clearTimeout(id)
  }, [booting])

  // Proteção de tela depois de um tempo sem mexer em nada
  useEffect(() => {
    if (booting || saver) return
    let timer = setTimeout(() => setSaver(true), IDLE_MS)
    const reset = () => {
      clearTimeout(timer)
      timer = setTimeout(() => setSaver(true), IDLE_MS)
    }
    const events = ["pointermove", "pointerdown", "keydown", "wheel"]
    events.forEach((name) => window.addEventListener(name, reset, { passive: true }))
    return () => {
      clearTimeout(timer)
      events.forEach((name) => window.removeEventListener(name, reset))
    }
  }, [booting, saver])

  const wake = useCallback(() => setSaver(false), [])

  function onContextMenu(event) {
    if (event.target.closest("section, header, [data-desk-item], [role='dialog']")) return
    event.preventDefault()
    setMenuOpen(false)
    setContextMenu({ x: event.clientX, y: event.clientY })
  }

  const contextItems = [
    { label: "Abrir Arquivos", hint: "⌥F", onClick: () => launch("arquivos") },
    { label: "Novo terminal", hint: "⌥T", onClick: () => launch("terminal") },
    { separator: true },
    { heading: "Papel de parede" },
    ...WALLPAPERS.map((item) => ({
      label: item.label,
      checked: item.id === wallpaper,
      onClick: () => chooseWallpaper(item.id),
    })),
    { separator: true },
    { label: "Organizar janelas", hint: "⌥O", onClick: tileAll },
    { label: "Minimizar tudo", onClick: minimizeAll },
    { label: theme === "dark" ? "Tema claro" : "Tema escuro", onClick: toggle },
    { label: "Proteção de tela", onClick: () => setSaver(true) },
    { separator: true },
    { label: "Versão simples", onClick: () => navigate(SIMPLE_BASE) },
  ]

  const focusedApp = focusedId ? APP[focusedId] : null
  const nothingOpen = visibleCount === 0
  const previewZ = focusedId ? wins[focusedId].z : 1

  return (
    <div className="desk-enter fixed inset-0 overflow-hidden text-ink" onContextMenu={onContextMenu}>
      <Wallpaper id={wallpaper} />

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
          <StatusMenu
            onClose={() => setMenuOpen(false)}
            onMinimizeAll={minimizeAll}
            wallpaper={wallpaper}
            onWallpaper={chooseWallpaper}
          />
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

        <Widgets onLaunch={launch} />

        <nav aria-label="Atalhos" data-desk-item className="absolute left-3 top-3">
          <ul className="flex flex-col gap-1">
            {DESK_APPS.map((app) => (
              <li key={app.id}>
                <DeskIcon app={app} onClick={() => launch(app.id)} />
              </li>
            ))}
          </ul>
        </nav>

        <div data-desk-item className="absolute bottom-3 right-4">
          <DeskIcon app={APP.lixeira} onClick={() => launch("lixeira")} />
        </div>

        {snapPreview && (
          <div
            aria-hidden
            style={{
              zIndex: previewZ,
              ...(snapPreview === "top"
                ? { left: GAP, top: GAP, right: GAP, bottom: GAP }
                : (({ x, y, w, h }) => ({ left: x, top: y, width: w, height: h }))(snapRect(snapPreview))),
            }}
            className="snap-preview pointer-events-none absolute rounded-xl border-2 border-accent bg-accent-tint backdrop-blur-[2px]"
          />
        )}

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
              onGeometry={(changes) => patch(id, changes)}
              onSnap={(zone) => snap(id, zone)}
              onSnapPreview={setSnapPreview}
              onClose={() => patch(id, { closing: true })}
              onMinimize={() => patch(id, { minimizing: true })}
              onMaximize={() => (state.maximized ? restore(id) : snap(id, "top"))}
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

      {hint && !booting && (
        <div
          role="status"
          className="desk-pop absolute bottom-[104px] left-1/2 z-[1002] flex w-[min(28rem,calc(100vw-2rem))] -translate-x-1/2 items-start gap-3 rounded-xl border border-line bg-surface p-4 shadow-[var(--shadow-card)]"
        >
          <div className="min-w-0 flex-1 text-sm">
            <p className="font-medium text-ink">Este site funciona como um computador.</p>
            <p className="mt-1 text-pretty text-muted">
              Clique nos ícones para abrir cada parte. Arraste uma janela até a borda para
              encaixar, puxe os cantos para redimensionar e use o botão direito na mesa para
              trocar o papel de parede.
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
        data-desk-item
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
          {[APP.terminal, APP.lixeira].map((app) => (
            <DockItem
              key={app.id}
              app={app}
              focused={focusedId === app.id}
              running={Boolean(wins[app.id] && !wins[app.id].closing)}
              onClick={() => onDockClick(app.id)}
            />
          ))}
        </ul>
      </nav>

      {toast && latestPaper && (
        <Toast
          app="Publicações"
          title={`Artigo publicado no ${latestPaper.venue.replace(" · ", " ")}`}
          body={latestPaper.title}
          onOpen={() => {
            closeToast()
            launch("publicacoes")
          }}
          onClose={closeToast}
        />
      )}

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextItems}
          onClose={() => setContextMenu(null)}
        />
      )}

      {saver && <Screensaver onWake={wake} />}

      {booting && (
        <Boot
          onDone={() => {
            markSeenThisSession(BOOT_KEY)
            setBooting(false)
          }}
        />
      )}
    </div>
  )
}

function DeskIcon({ app, onClick }) {
  const Icon = app.icon
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-24 flex-col items-center gap-1.5 rounded-lg p-2 text-center transition-colors hover:bg-surface/60"
    >
      <span className="grid h-12 w-12 place-items-center rounded-2xl border border-line bg-surface text-ink-soft shadow-sm transition-colors group-hover:border-accent group-hover:text-accent">
        <Icon size={22} />
      </span>
      <span className="rounded px-1 text-[12px] leading-tight text-ink-soft [text-shadow:0_1px_2px_var(--paper)] group-hover:text-ink">
        {app.title}
      </span>
    </button>
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
