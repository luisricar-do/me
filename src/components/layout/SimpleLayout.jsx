import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { SiteBaseContext, SIMPLE_BASE } from "../../lib/siteMode"

/** A versão simples: a página rolável de sempre, com cabeçalho e rodapé. */
export function SimpleLayout() {
  return (
    <SiteBaseContext.Provider value={SIMPLE_BASE}>
      <Header />
      <main id="conteudo" className="@container">
        <Outlet />
      </main>
      <Footer />
    </SiteBaseContext.Provider>
  )
}
