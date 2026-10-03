import { Link } from "react-router-dom"
import { useSiteBase, withBase } from "../../lib/siteMode"

/** Link interno que continua na versão do site em que a pessoa está. */
export function SiteLink({ to, ...props }) {
  const base = useSiteBase()
  return <Link to={withBase(base, to)} {...props} />
}
