import { useEffect, useRef, useState } from "react"

/**
 * Revela conteúdo quando entra no viewport. Substitui o whileInView do
 * framer-motion: aqui o JS só liga um atributo e o CSS faz a transição.
 */
export function useInView({ margin = "0px 0px -8% 0px", once = true } = {}) {
  const ref = useRef(null)
  // Sem IntersectionObserver, mostra tudo desde o início
  const [inView, setInView] = useState(
    () => typeof window !== "undefined" && !("IntersectionObserver" in window)
  )

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (!("IntersectionObserver" in window)) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { rootMargin: margin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [margin, once])

  return [ref, inView]
}
