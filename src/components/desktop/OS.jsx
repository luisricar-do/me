import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { DesktopScreen } from "./Desktop"
import { PhoneScreen } from "./Phone"
import { APP, appForPath } from "./apps"
import { site } from "../../data/site"
import { usePageMeta } from "../../hooks/usePageMeta"

// Abaixo disso não cabe janela lado a lado: tablet em pé e celular viram app
const DESKTOP_QUERY = "(min-width: 900px)"

function useIsDesktop() {
  const [desktop, setDesktop] = useState(() => window.matchMedia(DESKTOP_QUERY).matches)
  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY)
    const onChange = () => setDesktop(media.matches)
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [])
  return desktop
}

const HOME_TITLE = `${site.name} | IA aplicada à engenharia`
const HOME_DESCRIPTION =
  "Luis Ricardo Santos, Gerente de Governança de TI e IA na Tech for Humans. Uso IA para fazer engenharia funcionar melhor: onde ela acelera, onde não deve entrar e como governar. Escrevo no Substack."

/** A versão interativa: desktop no computador, app no celular. Mesmo conteúdo, mesmas URLs. */
export function OS() {
  const { pathname } = useLocation()
  const desktop = useIsDesktop()
  const app = APP[appForPath(pathname)]

  usePageMeta(
    app ? (app.meta?.title ?? `${app.title} · ${site.name}`) : HOME_TITLE,
    app?.meta?.description ?? HOME_DESCRIPTION
  )

  return desktop ? <DesktopScreen /> : <PhoneScreen />
}
