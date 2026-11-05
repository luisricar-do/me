import { useLocation } from "react-router-dom"
import { structuredData } from "../../lib/structuredData"

/** JSON-LD da rota atual. Entra no HTML pré-renderizado de cada página. */
export function StructuredData() {
  const { pathname } = useLocation()
  // < escapado para que nenhum texto dos dados feche a tag <script>
  const json = JSON.stringify(structuredData(pathname)).replace(/</g, "\\u003c")
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
