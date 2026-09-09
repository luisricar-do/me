/** Verdade única sobre preferência de movimento, checada no momento do uso. */
export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true
  )
}

/** Ponteiro com hover de verdade: evita parallax em toque. */
export function hasHover() {
  return typeof window !== "undefined" && window.matchMedia?.("(hover: hover)").matches === true
}

export function clamp(value, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max)
}
