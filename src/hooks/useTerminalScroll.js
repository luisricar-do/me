import { useEffect, useState } from "react"
import { clamp, prefersReducedMotion } from "../lib/motion"

/**
 * Progresso do trecho em que a seção fica presa na tela, escrito na custom
 * property `--p` do próprio elemento — o CSS cuida das opacidades, então
 * rolar a página não re-renderiza o React.
 *
 * O valor só avança: o que já apareceu não volta a sumir.
 * Devolve quantos caracteres do comando já foram digitados, e isso sim
 * re-renderiza, no máximo uma vez por caractere.
 */
export function useTerminalScroll(ref, length, typeUntil = 0.22) {
  const [chars, setChars] = useState(() => (prefersReducedMotion() ? length : 0))

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (prefersReducedMotion()) {
      element.style.setProperty("--p", "1")
      return
    }

    let frame = 0
    let peak = 0

    const measure = () => {
      frame = 0
      const rect = element.getBoundingClientRect()
      const travel = rect.height - window.innerHeight
      const raw = travel > 0 ? -rect.top / travel : 1
      peak = clamp(Math.max(raw, peak))
      element.style.setProperty("--p", peak.toFixed(4))

      const typed = Math.round(clamp(peak / typeUntil) * length)
      setChars((previous) => (previous === typed ? previous : typed))
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    frame = requestAnimationFrame(measure)
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [ref, length, typeUntil])

  return chars
}
