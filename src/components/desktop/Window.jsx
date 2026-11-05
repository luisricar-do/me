import { useRef } from "react"
import { clamp } from "../../lib/motion"

const MIN_W = 380
const MIN_H = 260
// Distância da borda que conta como "encostar" para encaixar a janela
const SNAP_EDGE = 8

const HANDLES = [
  { dir: "n", className: "inset-x-3 -top-1 h-2 cursor-ns-resize" },
  { dir: "s", className: "inset-x-3 -bottom-1 h-2 cursor-ns-resize" },
  { dir: "e", className: "inset-y-3 -right-1 w-2 cursor-ew-resize" },
  { dir: "w", className: "inset-y-3 -left-1 w-2 cursor-ew-resize" },
  { dir: "ne", className: "-right-1 -top-1 h-3.5 w-3.5 cursor-nesw-resize" },
  { dir: "nw", className: "-left-1 -top-1 h-3.5 w-3.5 cursor-nwse-resize" },
  { dir: "se", className: "-bottom-1 -right-1 h-3.5 w-3.5 cursor-nwse-resize" },
  { dir: "sw", className: "-bottom-1 -left-1 h-3.5 w-3.5 cursor-nesw-resize" },
]

function snapZone(event, area) {
  const x = event.clientX - area.left
  const y = event.clientY - area.top
  if (y <= SNAP_EDGE) return "top"
  if (x <= SNAP_EDGE) return "left"
  if (x >= area.width - SNAP_EDGE) return "right"
  return null
}

/**
 * Janela do desktop. Arraste e redimensionamento mexem direto no estilo do
 * elemento e só vão para o estado no pointerup: assim o conteúdo da janela
 * (a régua, o terminal) não re-renderiza a cada pixel.
 *
 * Arrastar até a borda encaixa: esquerda e direita ocupam meia tela, o topo
 * maximiza. `onSnapPreview` avisa o desktop para desenhar onde ela vai cair.
 */
export function Window({
  app,
  state,
  focused,
  compact,
  onFocus,
  onGeometry,
  onSnap,
  onSnapPreview,
  onClose,
  onMinimize,
  onMaximize,
  onAnimationDone,
  children,
}) {
  const ref = useRef(null)
  const drag = useRef(null)
  const resize = useRef(null)
  const fill = compact || state.maximized

  function onPointerDown(event) {
    if (fill || event.button !== 0 || event.target.closest("button")) return
    const area = ref.current.parentElement.getBoundingClientRect()
    drag.current = { startX: event.clientX, startY: event.clientY, area, dx: 0, dy: 0, zone: null }
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
    const zone = Math.abs(current.dx) + Math.abs(current.dy) > 4 ? snapZone(event, current.area) : null
    if (zone !== current.zone) {
      current.zone = zone
      onSnapPreview?.(zone)
    }
  }

  function onPointerUp() {
    const current = drag.current
    if (!current) return
    drag.current = null
    ref.current.style.transform = ""
    onSnapPreview?.(null)
    if (current.zone) {
      onSnap(current.zone)
      return
    }
    if (!current.dx && !current.dy) return
    // Tirar uma janela encaixada do lugar devolve o tamanho que ela tinha
    const size = state.snapped && state.restore ? { w: state.restore.w, h: state.restore.h } : {}
    onGeometry({ x: state.x + current.dx, y: state.y + current.dy, ...size, snapped: null, restore: null })
  }

  function onResizeDown(event, dir) {
    if (event.button !== 0) return
    event.stopPropagation()
    const area = ref.current.parentElement.getBoundingClientRect()
    resize.current = { dir, startX: event.clientX, startY: event.clientY, area, rect: null }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function onResizeMove(event) {
    const current = resize.current
    if (!current) return
    const dx = event.clientX - current.startX
    const dy = event.clientY - current.startY
    let { x, y, w, h } = state
    if (current.dir.includes("e")) w = clamp(state.w + dx, MIN_W, current.area.width - state.x)
    if (current.dir.includes("s")) h = clamp(state.h + dy, MIN_H, current.area.height - state.y)
    if (current.dir.includes("w")) {
      w = clamp(state.w - dx, MIN_W, state.x + state.w)
      x = state.x + state.w - w
    }
    if (current.dir.includes("n")) {
      h = clamp(state.h - dy, MIN_H, state.y + state.h)
      y = state.y + state.h - h
    }
    current.rect = { x, y, w, h }
    Object.assign(ref.current.style, { left: `${x}px`, top: `${y}px`, width: `${w}px`, height: `${h}px` })
  }

  function onResizeUp() {
    const current = resize.current
    if (!current) return
    resize.current = null
    if (current.rect) onGeometry({ ...current.rect, snapped: null, restore: null })
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
      className={`${motion} absolute flex flex-col rounded-xl border bg-surface shadow-[var(--shadow-card)] ${
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
        className={`flex shrink-0 select-none items-center gap-2 rounded-t-xl border-b border-line-soft bg-surface-2 px-3.5 py-2.5 ${
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
        className="@container min-h-0 flex-1 overflow-y-auto overscroll-contain rounded-b-xl"
      >
        {children}
      </div>

      {!fill &&
        HANDLES.map(({ dir, className }) => (
          <span
            key={dir}
            aria-hidden
            onPointerDown={(event) => onResizeDown(event, dir)}
            onPointerMove={onResizeMove}
            onPointerUp={onResizeUp}
            onPointerCancel={onResizeUp}
            className={`absolute z-10 touch-none ${className}`}
          />
        ))}
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
