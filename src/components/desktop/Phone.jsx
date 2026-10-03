import { Link, useLocation, useNavigate } from "react-router-dom"
import { ArrowUpRight, ChevronLeft, House, Mail, Mic, UserRound } from "lucide-react"
import { Mark } from "../ui/Mark"
import { Shell } from "./Shell"
import { APP, APPS, appForPath } from "./apps"
import { site } from "../../data/site"
import { stage } from "../../lib/agenda"
import { useTheme } from "../../hooks/useTheme"
import { SIMPLE_BASE } from "../../lib/siteMode"

const HOME_APPS = APPS.filter((app) => app.listed !== false)

const TABS = [
  { to: "/", label: "Início", icon: House },
  { to: APP.sobre.path, label: "Sobre", icon: UserRound },
  { to: APP.palestras.path, label: "Palestras", icon: Mic },
  { to: APP.contato.path, label: "Contato", icon: Mail },
]

/**
 * A versão interativa no celular: o site como um app. Uma tela inicial com
 * ícones grandes, cada parte do site abre em tela cheia com "voltar", e uma
 * barra fixa embaixo deixa o contato sempre a um toque.
 */
export function PhoneScreen() {
  const { pathname } = useLocation()
  const id = appForPath(pathname)

  return (
    <div className="min-h-svh pb-[calc(4.5rem+env(safe-area-inset-bottom))] text-ink">
      {id ? <AppScreen key={id} id={id} /> : <HomeScreen />}
      <TabBar pathname={pathname} />
    </div>
  )
}

function HomeScreen() {
  const next = stage(new Date())

  return (
    <main id="conteudo" className="app-push mx-auto max-w-xl px-5 pt-10">
      <header className="flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl border border-line bg-surface text-ink">
          <Mark size={24} />
        </span>
        <div className="min-w-0">
          <h1 className="font-semibold leading-tight text-ink">{site.name}</h1>
          <p className="text-sm text-muted">
            {site.role} · {site.company}
          </p>
        </div>
      </header>

      <p className="display mt-7 text-balance text-[1.75rem] leading-tight text-ink">
        O mais difícil em IA é decidir <span className="italic text-accent">onde ela não entra.</span>
      </p>
      <p className="mt-3 text-sm text-muted">Toque em um ícone para abrir.</p>

      <nav aria-label="Apps" className="mt-7">
        <ul className="grid grid-cols-3 gap-x-3 gap-y-6 min-[400px]:grid-cols-4">
          {HOME_APPS.map((app) => {
            const Icon = app.icon
            return (
              <li key={app.id}>
                <Link
                  to={app.path}
                  state={{ fromHome: true }}
                  className="group flex flex-col items-center gap-2 text-center"
                >
                  <span className="grid h-16 w-16 place-items-center rounded-[1.25rem] border border-line bg-surface text-accent shadow-[var(--shadow-card)] transition-transform group-active:scale-95">
                    <Icon size={28} />
                  </span>
                  <span className="text-[12.5px] leading-tight text-ink">{app.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Widget: o próximo (ou o último) evento, como um card de tela inicial */}
      <Link
        to={APP.palestras.path}
        state={{ fromHome: true }}
        className="mt-9 block rounded-2xl border border-line bg-surface p-4 shadow-[var(--shadow-card)]"
      >
        <p className="label text-accent">{next.label}</p>
        <p className="mt-2 font-medium leading-snug text-ink">{next.talk.title}</p>
        <p className="mt-1 text-sm text-muted">
          {next.talk.event} · {next.talk.dateLabel}
        </p>
      </Link>

      <Link
        to={APP.contato.path}
        state={{ fromHome: true }}
        className="mt-3 flex items-center justify-between rounded-2xl bg-accent px-4 py-3.5 font-medium text-accent-ink"
      >
        Convidar para uma palestra
        <ArrowUpRight size={18} />
      </Link>

      <p className="mt-10 pb-6 text-center text-sm text-muted">
        Prefere ler tudo numa página só?{" "}
        <Link to={SIMPLE_BASE} className="text-accent underline underline-offset-4">
          Versão simples
        </Link>
      </p>
    </main>
  )
}

function AppScreen({ id }) {
  const app = APP[id]
  const View = app.View
  const navigate = useNavigate()
  const { state } = useLocation()
  const { toggle } = useTheme()

  // Veio da tela inicial: voltar é o "voltar" do browser. Chegou por link: vai para o início
  function back() {
    if (state?.fromHome) navigate(-1)
    else navigate("/")
  }

  return (
    <div className="app-push">
      <header className="sticky top-0 z-40 grid grid-cols-[1fr_auto_1fr] items-center border-b border-line-soft bg-paper/85 px-2 py-2 backdrop-blur-xl">
        <button
          type="button"
          onClick={back}
          className="flex items-center gap-0.5 justify-self-start rounded-lg py-1.5 pl-1 pr-3 text-[15px] text-accent"
        >
          <ChevronLeft size={22} />
          Início
        </button>
        <h1 className="truncate text-[15px] font-semibold text-ink">{app.title}</h1>
        <span />
      </header>

      <main id="conteudo" style={{ "--sticky-top": "3.75rem" }} className="@container">
        {id === "terminal" ? (
          <div className="h-[calc(100svh-7.5rem)]">
            <Shell
              onLaunch={(target) => APP[target] && navigate(APP[target].path, { state: { fromHome: true } })}
              onExit={back}
              onSimple={() => navigate(SIMPLE_BASE)}
              onTheme={toggle}
            />
          </div>
        ) : (
          <View />
        )}
      </main>
    </div>
  )
}

function TabBar({ pathname }) {
  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-paper/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl"
    >
      <ul className="mx-auto grid max-w-xl grid-cols-4">
        {TABS.map(({ to, label, icon: Icon }) => {
          const active = pathname === to
          return (
            <li key={to}>
              <Link
                to={to}
                replace
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center gap-1 pb-2 pt-2.5 text-[11px] font-medium ${
                  active ? "text-accent" : "text-muted"
                }`}
              >
                <Icon size={22} strokeWidth={active ? 2.25 : 1.75} />
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
