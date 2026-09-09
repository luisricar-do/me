import { useCallback, useEffect, useMemo, useState } from "react"
import { flushSync } from "react-dom"
import { ThemeContext } from "../../lib/themeContext"
import { prefersReducedMotion } from "../../lib/motion"

const STORAGE_KEY = "theme"

function readStored() {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === "light" || value === "dark" ? value : null
  } catch {
    return null
  }
}

function systemTheme() {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

/**
 * Estado único do tema. Precisa ser provider: o tema é alternado do botão do
 * header, do terminal e da paleta ⌘K, e com estado local cada um teria a sua
 * própria versão da verdade.
 *
 * Segue o sistema até a pessoa escolher manualmente. A troca usa a View
 * Transitions API para abrir o tema novo em círculo a partir de onde foi
 * clicado; onde a API não existe, troca direto.
 */
export function ThemeProvider({ children }) {
  const [explicit, setExplicit] = useState(() => readStored() !== null)
  const [theme, setTheme] = useState(() => readStored() ?? systemTheme())

  useEffect(() => {
    const root = document.documentElement
    if (explicit) root.setAttribute("data-theme", theme)
    else root.removeAttribute("data-theme")
  }, [theme, explicit])

  useEffect(() => {
    if (explicit) return
    const query = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = (event) => setTheme(event.matches ? "dark" : "light")
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [explicit])

  const toggle = useCallback(
    (event) => {
      const next = theme === "dark" ? "light" : "dark"
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* modo privado: vale só para esta sessão */
      }

      const commit = () => {
        // Aplicado direto no DOM para o snapshot da transição já ver o tema novo
        document.documentElement.setAttribute("data-theme", next)
        flushSync(() => {
          setTheme(next)
          setExplicit(true)
        })
      }

      if (typeof document.startViewTransition !== "function" || prefersReducedMotion()) {
        commit()
        return
      }

      // Lido antes de qualquer await: currentTarget é zerado no fim do handler
      const box = event?.currentTarget?.getBoundingClientRect?.()
      const x = box ? box.left + box.width / 2 : window.innerWidth / 2
      const y = box ? box.top + box.height / 2 : 0
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      )

      document
        .startViewTransition(commit)
        .ready.then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${radius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 520,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              pseudoElement: "::view-transition-new(root)",
            }
          )
        })
        .catch(() => {
          /* transição cancelada: o tema já foi aplicado */
        })
    },
    [theme]
  )

  const value = useMemo(() => ({ theme, toggle }), [theme, toggle])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
