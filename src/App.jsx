import { useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { SimpleLayout } from "./components/layout/SimpleLayout"
import { CommandPalette } from "./components/ui/CommandPalette"
import { OS } from "./components/desktop/OS"
import { APPS } from "./components/desktop/apps"
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
    // instant: o html tem scroll-behavior smooth e isso animaria a volta ao topo
    window.scrollTo({ top: 0, behavior: "instant" })
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
      {/* Um único layout para todas as rotas da versão interativa: trocar de
          app troca a URL sem desmontar o desktop e as janelas abertas */}
      <Routes>
        <Route element={<OS />}>
          <Route index />
          {APPS.map((app) => (
            <Route key={app.id} path={app.path} />
          ))}
        </Route>
        <Route path="/simples" element={<SimpleLayout />}>
          <Route index element={<Home />} />
          <Route path="ia" element={<AiRuler />} />
          <Route path="eduflow" element={<Eduflow />} />
        </Route>
        <Route element={<SimpleLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
