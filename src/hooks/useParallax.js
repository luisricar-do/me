import { useTransform, useScroll } from "framer-motion"

/**
 * Hook para efeito parallax baseado no scroll.
 * @param {React.RefObject} ref - Ref do elemento a observar
 * @param {number} offset - [start, end] em 0–1 (percentual do viewport)
 * @returns {import('framer-motion').MotionValue} valor transformável
 */
export function useParallax(ref, offset = [0.2, 0.8]) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [offset[0], offset[1]],
  })
  return useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
}
