import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Check, X } from "lucide-react"
import { Mark } from "../ui/Mark"
import { useNow } from "../../hooks/useNow"

/*
 * As camadas por cima do desktop: a tela de boot, a notificação, o menu de
 * clique direito e a proteção de tela. Nenhuma prende o visitante: qualquer
 * clique ou tecla tira o boot e a proteção de tela da frente.
 */

const BOOT_MS = 1700

/** A tela de boot: a régua montando barra por barra, uma vez por sessão. */
export function Boot({ onDone }) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const finish = setTimeout(() => setLeaving(true), BOOT_MS)
    const skip = () => setLeaving(true)
    window.addEventListener("keydown", skip)
    window.addEventListener("pointerdown", skip)
    return () => {
      clearTimeout(finish)
      window.removeEventListener("keydown", skip)
      window.removeEventListener("pointerdown", skip)
    }
  }, [])

  return (
    <div
      aria-hidden
      onAnimationEnd={(event) => {
        if (leaving && event.target === event.currentTarget) onDone()
      }}
      className={`fixed inset-0 z-[4000] grid place-items-center bg-[#0b0b0d] text-[#edece8] ${
        leaving ? "boot-leave" : ""
      }`}
    >
      <div className="flex flex-col items-center">
        <svg width="88" height="88" viewBox="0 0 32 32" className="boot-mark">
          <rect x="5" y="5" width="10" height="5" rx="1" fill="currentColor" />
          <rect x="5" y="14" width="16" height="5" rx="1" fill="currentColor" />
          <rect x="5" y="23" width="22" height="5" rx="1" fill="#ff606a" />
        </svg>
        <span className="mt-10 block h-1 w-44 overflow-hidden rounded-full bg-white/10">
          <span className="boot-progress block h-full rounded-full bg-[#edece8]" />
        </span>
        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">luisr.com.br</p>
      </div>
    </div>
  )
}

const TOAST_MS = 9000

/** Notificação no canto, como as do sistema. Some sozinha depois de alguns segundos. */
export function Toast({ app, title, body, onOpen, onClose }) {
  useEffect(() => {
    const id = setTimeout(onClose, TOAST_MS)
    return () => clearTimeout(id)
  }, [onClose])

  return (
    <div
      role="status"
      className="toast-in absolute right-3 top-[46px] z-[2000] w-[min(22rem,calc(100vw-1.5rem))] rounded-2xl border border-line bg-surface/90 shadow-[var(--shadow-card)] backdrop-blur-xl"
    >
      <button type="button" onClick={onOpen} className="flex w-full items-start gap-3 p-3.5 pr-10 text-left">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#14151a] text-[#edece8]">
          <Mark size={20} />
        </span>
        <span className="min-w-0">
          <span className="flex items-baseline gap-2">
            <span className="label text-muted">{app}</span>
            <span className="text-[11px] text-muted">agora</span>
          </span>
          <span className="mt-1 block text-sm font-medium text-ink">{title}</span>
          <span className="mt-0.5 line-clamp-2 block text-[13px] text-ink-soft">{body}</span>
        </span>
      </button>
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar notificação"
        className="absolute right-2.5 top-2.5 grid h-6 w-6 place-items-center rounded-full text-muted transition-colors hover:bg-line-soft hover:text-ink"
      >
        <X size={13} />
      </button>
    </div>
  )
}

/**
 * Menu de clique direito. `items` aceita { label, onClick, checked, hint } ou
 * { separator: true } e { heading }. Fica sempre dentro da tela.
 */
export function ContextMenu({ x, y, items, onClose }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ left: x, top: y })

  useLayoutEffect(() => {
    const box = ref.current.getBoundingClientRect()
    setPos({
      left: Math.min(x, window.innerWidth - box.width - 8),
      top: Math.min(y, window.innerHeight - box.height - 8),
    })
  }, [x, y])

  useEffect(() => {
    ref.current.querySelector("button")?.focus()
    const onKey = (event) => {
      if (event.key === "Escape") onClose()
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return
      event.preventDefault()
      const buttons = [...ref.current.querySelectorAll("button")]
      const index = buttons.indexOf(document.activeElement)
      const next = event.key === "ArrowDown" ? index + 1 : index - 1
      buttons[(next + buttons.length) % buttons.length]?.focus()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  return (
    <>
      <div
        className="fixed inset-0 z-[2500]"
        onPointerDown={onClose}
        onContextMenu={(event) => {
          event.preventDefault()
          onClose()
        }}
      />
      <div
        ref={ref}
        role="menu"
        style={pos}
        className="desk-pop fixed z-[2501] min-w-56 rounded-xl border border-line bg-surface/95 p-1.5 text-[13px] shadow-[var(--shadow-card)] backdrop-blur-xl"
      >
        {items.map((item, index) => {
          if (item.separator) return <div key={`sep-${index}`} className="my-1 h-px bg-line-soft" />
          if (item.heading)
            return (
              <p key={item.heading} className="label px-2.5 pb-1 pt-1.5 text-muted">
                {item.heading}
              </p>
            )
          return (
            <button
              key={item.label}
              type="button"
              role={item.checked === undefined ? "menuitem" : "menuitemradio"}
              aria-checked={item.checked}
              onClick={() => {
                onClose()
                item.onClick()
              }}
              className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left text-ink outline-none transition-colors hover:bg-accent hover:text-accent-ink focus-visible:bg-accent focus-visible:text-accent-ink"
            >
              <span className="grid w-4 place-items-center">{item.checked && <Check size={13} />}</span>
              <span className="flex-1">{item.label}</span>
              {item.hint && <span className="font-mono text-[11px] opacity-60">{item.hint}</span>}
            </button>
          )
        })}
      </div>
    </>
  )
}

const saverTime = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" })
const saverDay = new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "numeric", month: "long" })
const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1)

/** Proteção de tela: relógio grande e a régua quicando pelas bordas. */
export function Screensaver({ onWake }) {
  const now = useNow()

  useEffect(() => {
    const wake = () => onWake()
    // O pointermove que acontece junto com a montagem não conta
    const id = setTimeout(() => {
      window.addEventListener("pointermove", wake)
      window.addEventListener("pointerdown", wake)
      window.addEventListener("keydown", wake)
      window.addEventListener("wheel", wake)
    }, 400)
    return () => {
      clearTimeout(id)
      window.removeEventListener("pointermove", wake)
      window.removeEventListener("pointerdown", wake)
      window.removeEventListener("keydown", wake)
      window.removeEventListener("wheel", wake)
    }
  }, [onWake])

  return (
    <div aria-hidden className="desk-enter fixed inset-0 z-[4500] overflow-hidden bg-[#06070a] text-[#edece8]">
      <div className="saver-x absolute inset-y-0 left-0 w-[120px]">
        <div className="saver-y absolute left-0 top-0 h-[120px] w-[120px]">
          <svg viewBox="0 0 32 32" className="h-full w-full">
            <rect x="5" y="5" width="10" height="5" rx="1" fill="currentColor" opacity="0.85" />
            <rect x="5" y="14" width="16" height="5" rx="1" fill="currentColor" opacity="0.85" />
            <rect x="5" y="23" width="22" height="5" rx="1" fill="#ff606a" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-[12vh] text-center">
        <p className="display text-[min(18vw,11rem)] leading-none tabular-nums">{saverTime.format(now)}</p>
        <p className="mt-4 text-sm text-white/50">{capitalize(saverDay.format(now))}</p>
        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">
          mexa o mouse para voltar
        </p>
      </div>
    </div>
  )
}
