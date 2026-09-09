import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, Scale, X } from "lucide-react"
import { site } from "../../data/site"
import { ThemeToggle } from "../ui/ThemeToggle"
import { useActiveSection } from "../../hooks/useActiveSection"
import { useScrollBar } from "../../hooks/useScrollBar"

const navLinks = [
  { id: "sobre", label: "Sobre" },
  { id: "destaques", label: "Destaques" },
  { id: "palestras", label: "Palestras" },
  { id: "projetos", label: "Projetos" },
  { id: "trajetoria", label: "Trajetória" },
  { id: "contato", label: "Contato" },
]

const sectionIds = ["hero", ...navLinks.map((link) => link.id)]

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === "/"
  const active = useActiveSection(sectionIds)
  useScrollBar()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])


  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open
          ? "border-b border-line bg-paper/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link
          to="/"
          className="group flex items-center gap-2.5 text-sm font-medium tracking-tight text-ink"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150" />
          {site.name}
        </Link>

        <ul className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <SectionLink
                id={link.id}
                isHome={isHome}
                active={isHome && active === link.id}
                className={`link-underline text-sm transition-colors duration-300 ${
                  isHome && active === link.id ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
              </SectionLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            to="/ia"
            className={`hidden items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[11px] transition-colors md:inline-flex ${
              pathname === "/ia"
                ? "border-accent bg-accent-tint text-accent"
                : "border-line text-ink-soft hover:border-accent hover:text-accent"
            }`}
          >
            <Scale size={12} />
            Régua de IA
          </Link>
          <ThemeToggle />
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      <div data-scrollbar className="h-px bg-accent" aria-hidden />

      <div
        className={`grid overflow-hidden border-t border-line bg-paper transition-[grid-template-rows] duration-300 lg:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr] border-t-transparent"
        }`}
      >
        <ul className="min-h-0 px-6">
          <li className="border-b border-line-soft">
            <Link
              to="/ia"
              className="flex items-baseline gap-4 py-4 text-lg text-accent"
              onClick={() => setOpen(false)}
            >
              <span className="label text-accent">→</span>
              Régua de IA
            </Link>
          </li>
          {navLinks.map((link, i) => (
            <li key={link.id} className="border-b border-line-soft last:border-b-0">
              <SectionLink
                id={link.id}
                isHome={isHome}
                className="flex items-baseline gap-4 py-4 text-lg text-ink"
                onClick={() => setOpen(false)}
              >
                <span className="label text-muted tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {link.label}
              </SectionLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}

/**
 * Na home usa âncora nativa: clicar no mesmo item duas vezes rola de novo,
 * o que um Link de rota com hash não faz (a location não muda).
 */
function SectionLink({ id, isHome, active, children, ...props }) {
  if (isHome) {
    return (
      <a href={`#${id}`} aria-current={active ? "true" : undefined} {...props}>
        {children}
      </a>
    )
  }
  return (
    <Link to={`/#${id}`} {...props}>
      {children}
    </Link>
  )
}
