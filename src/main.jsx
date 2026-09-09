import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import App from "./App.jsx"
import { ThemeProvider } from "./components/theme/ThemeProvider"

// Sem isso o browser restaura a posição no F5 e, com scroll-behavior: smooth,
// a restauração vira uma rolagem animada descendo o hero sozinha.
if ("scrollRestoration" in history) history.scrollRestoration = "manual"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)
