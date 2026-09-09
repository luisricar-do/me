import { useCallback, useEffect, useRef, useState } from "react"
import { clamp, prefersReducedMotion } from "../lib/motion"

/**
 * Progresso do trecho em que a seção fica presa na tela, escrito na custom
 * property `--p` do próprio elemento — o CSS cuida das opacidades, então
 * rolar a página não re-renderiza o React.
 *
 * O valor só avança: o que já apareceu não volta a sumir.
 * Devolve quantos caracteres do comando já foram digitados (isso sim
 * re-renderiza, no máximo uma vez por caractere) e um `complete` para
 * pular a animação quando a pessoa interage com o terminal.
 */
export function useTerminalScroll(ref, length, typeUntil = 0.22) {
  const [chars, setChars] = useState(() => (prefersReducedMotion() ? length : 0))
  const skipped = useRef(false)
  const peak = useRef(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (prefersReducedMotion()) {
      element.style.setProperty("--p", "1")
      return
    }

    let frame = 0

    const measure = () => {
      frame = 0
      if (skipped.current) return
      const rect = element.getBoundingClientRect()
      const travel = rect.height - window.innerHeight
      const raw = travel > 0 ? -rect.top / travel : 1
      peak.current = clamp(Math.max(raw, peak.current))
      element.style.setProperty("--p", peak.current.toFixed(4))

      const typed = Math.round(clamp(peak.current / typeUntil) * length)
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

  /** Pula direto para o fim: usado quando a pessoa começa a usar o terminal. */
  const complete = useCallback(() => {
    if (skipped.current) return
    skipped.current = true
    peak.current = 1
    ref.current?.style.setProperty("--p", "1")
    setChars(length)
  }, [ref, length])

  return [chars, complete]
}
