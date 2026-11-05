import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { flushSync } from "react-dom"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import App from "./App.jsx"
import { ThemeProvider } from "./components/theme/ThemeProvider"

// Sem isso o browser restaura a posição no F5 e, com scroll-behavior: smooth,
// a restauração vira uma rolagem animada descendo o hero sozinha.
if ("scrollRestoration" in history) history.scrollRestoration = "manual"

// O HTML pré-renderizado (scripts/prerender.mjs) é só para quem não roda JS:
// o React monta do zero por cima e, já montado, a página volta a aparecer
const container = document.getElementById("root")
const root = createRoot(container)
flushSync(() => {
  root.render(
    <StrictMode>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </StrictMode>
  )
})
container.removeAttribute("data-prerendered")
