import { useScroll } from "framer-motion"

/**
 * Retorna o progresso de scroll da página (0 a 1).
 */
export function useScrollProgress() {
  const { scrollYProgress } = useScroll()
  return scrollYProgress
}
