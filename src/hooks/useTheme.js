import { useContext } from "react"
import { ThemeContext } from "../lib/themeContext"

export function useTheme() {
  const value = useContext(ThemeContext)
  if (!value) throw new Error("useTheme precisa de um ThemeProvider acima na árvore")
  return value
}
