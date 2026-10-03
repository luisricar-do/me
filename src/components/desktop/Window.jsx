import { useRef } from "react"
import { clamp } from "../../lib/motion"

/**
 * Janela do desktop. O arraste mexe só no transform do elemento, direto no
 * DOM, e a posição vai para o estado no pointerup: assim o conteúdo da
 * janela (a régua, o terminal) não re-renderiza a cada pixel.
 */
export function Window({
  app,
  state,
  focused,
  compact,
  onFocus,
  onMove,
  onClose,
  onMinimize,
  onMaximize,
  onAnimationDone,
  children,
}) {
  const ref = useRef(null)
  const drag = useRef(null)
  const fill = compact || state.maximized

  function onPointerDown(event) {
    if (fill || event.button !== 0 || event.target.closest("button")) return
    const area = ref.current.parentElement.getBoundingClientRect()
    drag.current = { startX: event.clientX, startY: event.clientY, area, dx: 0, dy: 0 }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function onPointerMove(event) {
    const current = drag.current
    if (!current) return
    // Deixa sempre um pedaço da barra de título à vista para dar para puxar de volta
    const x = clamp(state.x + event.clientX - current.startX, 96 - state.w, current.area.width - 96)
    const y = clamp(state.y + event.clientY - current.startY, 0, current.area.height - 40)
    current.dx = x - state.x
    current.dy = y - state.y
    ref.current.style.transform = `translate3d(${current.dx}px, ${current.dy}px, 0)`
  }

  function onPointerUp() {
    const current = drag.current
    if (!current) return
    drag.current = null
    ref.current.style.transform = ""
    if (current.dx || current.dy) onMove(state.x + current.dx, state.y + current.dy)
  }

  const motion = state.closing ? "desk-close" : state.minimizing ? "desk-minimize" : "desk-open"

  return (
    <section
      ref={ref}
      aria-label={app.title}
      hidden={state.minimized}
      onPointerDownCapture={onFocus}
      onFocusCapture={onFocus}
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) onAnimationDone()
      }}
      style={
        fill
          ? { zIndex: state.z }
          : { zIndex: state.z, left: state.x, top: state.y, width: state.w, height: state.h }
      }
      className={`${motion} absolute flex flex-col overflow-hidden rounded-xl border bg-surface shadow-[var(--shadow-card)] ${
        fill ? "inset-2 md:inset-3" : ""
      } ${focused ? "border-line" : "border-line-soft"}`}
    >
      <header
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={(event) => {
          if (!compact && !event.target.closest("button")) onMaximize()
        }}
        className={`flex shrink-0 select-none items-center gap-2 border-b border-line-soft bg-surface-2 px-3.5 py-2.5 ${
          fill ? "" : "cursor-grab active:cursor-grabbing"
        }`}
      >
        <div className={`group flex items-center gap-2 ${focused ? "" : "opacity-50"}`}>
          <TrafficLight color="#ff5f57" label={`Fechar ${app.title}`} glyph="×" onClick={onClose} />
          <TrafficLight
            color="#febc2e"
            label={`Minimizar ${app.title}`}
            glyph="–"
            onClick={onMinimize}
          />
          {!compact && (
            <TrafficLight
              color="#28c840"
              label={state.maximized ? `Restaurar ${app.title}` : `Maximizar ${app.title}`}
              glyph="+"
              onClick={onMaximize}
            />
          )}
        </div>
        <h2 className="flex-1 truncate pr-12 text-center text-[13px] font-medium text-ink-soft">
          {app.title}
        </h2>
      </header>

      <div
        style={{ "--sticky-top": "1.5rem" }}
        className="@container min-h-0 flex-1 overflow-y-auto overscroll-contain"
      >
        {children}
      </div>
    </section>
  )
}

function TrafficLight({ color, label, glyph, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      style={{ backgroundColor: color }}
      className="grid h-3.5 w-3.5 place-items-center rounded-full text-[9px] font-bold leading-none text-black/40 transition-colors group-hover:text-black/70"
    >
      <span aria-hidden>{glyph}</span>
    </button>
  )
}
