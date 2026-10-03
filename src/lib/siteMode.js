import { createContext, useContext } from "react"

/**
 * O site tem duas versões com o mesmo conteúdo: a interativa (desktop no
 * computador, app no celular), na raiz, e a simples, rolável, em /simples.
 * O prefixo diz a um link interno em qual das duas ele está.
 */
export const SIMPLE_BASE = "/simples"

export const SiteBaseContext = createContext("")

export function useSiteBase() {
  return useContext(SiteBaseContext)
}

/** "/ia" vira "/simples/ia" na versão simples; âncoras e externos passam direto. */
export function withBase(base, to) {
  if (typeof to !== "string" || !to.startsWith("/")) return to
  if (to === "/") return base || "/"
  if (to.startsWith("/#")) return base ? `${base}${to.slice(1)}` : to
  return `${base}${to}`
}

export function isSimplePath(pathname) {
  return pathname === SIMPLE_BASE || pathname.startsWith(`${SIMPLE_BASE}/`)
}
