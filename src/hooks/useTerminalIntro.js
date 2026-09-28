import { useCallback, useEffect, useRef, useState } from "react"
import { clamp, prefersReducedMotion } from "../lib/motion"

/**
 * Abertura do terminal dirigida pelo tempo, não pelo scroll: o hero cabe
 * numa tela só e a pessoa não precisa rolar para ver o conteúdo.
 *
 * O progresso (0 a 1) vai para a custom property `--p` do elemento — o CSS
 * cuida das opacidades, então a animação não re-renderiza o React.
 * Devolve quantos caracteres do comando já foram digitados (isso sim
 * re-renderiza, no máximo uma vez por caractere) e um `complete` para
 * pular a animação quando a pessoa interage com o terminal.
 */
export function useTerminalIntro(ref, length, { delay = 600, duration = 2600, typeUntil = 0.22 } = {}) {
  const [chars, setChars] = useState(() => (prefersReducedMotion() ? length : 0))
  const skipped = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (prefersReducedMotion()) {
      element.style.setProperty("--p", "1")
      return
    }

    element.style.setProperty("--p", "0")
    let frame = 0
    let start = 0

    const tick = (now) => {
      if (skipped.current) return
      if (!start) start = now + delay
      const progress = clamp((now - start) / duration)
      element.style.setProperty("--p", progress.toFixed(4))

      const typed = Math.round(clamp(progress / typeUntil) * length)
      setChars((previous) => (previous === typed ? previous : typed))

      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [ref, length, delay, duration, typeUntil])

  /** Pula direto para o fim: usado quando a pessoa começa a usar o terminal. */
  const complete = useCallback(() => {
    if (skipped.current) return
    skipped.current = true
    ref.current?.style.setProperty("--p", "1")
    setChars(length)
  }, [ref, length])

  return [chars, complete]
}
