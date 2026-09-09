import { useEffect } from "react"

/** Título e descrição por rota, para o link compartilhado fazer sentido. */
export function usePageMeta(title, description) {
  useEffect(() => {
    if (title) document.title = title
    if (description) {
      const tag = document.querySelector('meta[name="description"]')
      if (tag) tag.setAttribute("content", description)
    }
  }, [title, description])
}
