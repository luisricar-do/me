import { useEffect } from "react"
import { hasHover, prefersReducedMotion } from "../lib/motion"

/**
 * Parallax leve seguindo o cursor. Só escreve duas custom properties; a
 * suavização fica na transition do CSS, sem loop de animação em JS.
 */
export function useCursorTilt(ref, x = 16, y = 10) {
  useEffect(() => {
    const element = ref.current
    if (!element || prefersReducedMotion() || !hasHover()) return

    let frame = 0
    let event = null

    const apply = () => {
      frame = 0
      element.style.setProperty("--tilt-x", `${(event.clientX / window.innerWidth - 0.5) * x}px`)
      element.style.setProperty("--tilt-y", `${(event.clientY / window.innerHeight - 0.5) * y}px`)
    }

    const onMove = (moveEvent) => {
      event = moveEvent
      if (!frame) frame = requestAnimationFrame(apply)
    }

    window.addEventListener("mousemove", onMove)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener("mousemove", onMove)
    }
  }, [ref, x, y])
}
