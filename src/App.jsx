import { useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { Header } from "./components/layout/Header"
import { Footer } from "./components/layout/Footer"
import { CommandPalette } from "./components/ui/CommandPalette"
import { Home } from "./pages/Home"
import { AiRuler } from "./pages/AiRuler"
import { Eduflow } from "./pages/Eduflow"
import { NotFound } from "./pages/NotFound"

/** Ao trocar de rota: vai para a âncora, se houver, senão para o topo. */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.scrollIntoView({ block: "start" })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

function App() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:border focus:border-line focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
      >
        Pular para o conteúdo
      </a>
      <ScrollManager />
      <CommandPalette />
      <Header />
      <main id="conteudo">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ia" element={<AiRuler />} />
          <Route path="/eduflow" element={<Eduflow />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
