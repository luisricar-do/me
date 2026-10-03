import { ArrowUpRight, Minimize2, Moon, Search, Sun } from "lucide-react"
import { START_AT_COMPANY } from "../../data/about"
import { stage } from "../../lib/agenda"
import { mailto } from "../../data/site"
import { build, formattedBuildDate } from "../../lib/build"
import { openCommandPalette } from "../../lib/palette"
import { useNow } from "../../hooks/useNow"
import { useTheme } from "../../hooks/useTheme"

const DAY = 86_400_000
const two = (value) => String(value).padStart(2, "0")

/** Tempo de casa desde o primeiro dia, decomposto para virar contador. */
function tenure(now) {
  const anniversary = new Date(START_AT_COMPANY)
  let years = now.getFullYear() - anniversary.getFullYear()
  anniversary.setFullYear(anniversary.getFullYear() + years)
  if (anniversary > now) {
    years -= 1
    anniversary.setFullYear(anniversary.getFullYear() - 1)
  }
  const rest = now - anniversary
  const days = Math.floor(rest / DAY)
  const seconds = Math.floor((rest % DAY) / 1000)
  return {
    years,
    days,
    clock: `${two(Math.floor(seconds / 3600))}:${two(Math.floor((seconds % 3600) / 60))}:${two(seconds % 60)}`,
  }
}


/**
 * O popover da marca na menu bar: o equivalente a um app de status, com
 * números que andam sozinhos. Nada inventado: tudo sai dos dados do site.
 */
export function StatusMenu({ onMinimizeAll, onClose }) {
  const now = useNow()
  const { theme, toggle } = useTheme()
  const time = tenure(now)
  const next = stage(now)
  const builtAt = formattedBuildDate()
  const isDark = theme === "dark"

  const toggles = [
    {
      label: isDark ? "Tema claro" : "Tema escuro",
      icon: isDark ? Sun : Moon,
      onClick: toggle,
    },
    {
      label: "Buscar",
      icon: Search,
      onClick: () => {
        onClose()
        openCommandPalette()
      },
    },
    {
      label: "Minimizar tudo",
      icon: Minimize2,
      onClick: () => {
        onClose()
        onMinimizeAll()
      },
    },
  ]

  return (
    <div
      role="menu"
      aria-label="Status"
      className="desk-pop absolute left-2 top-10 z-[1000] w-[min(20rem,calc(100vw-1rem))] rounded-xl border border-line bg-surface/95 p-3 shadow-[var(--shadow-card)] backdrop-blur-xl"
    >
      <section className="rounded-lg bg-surface-2 p-3">
        <p className="label text-muted">Na Tech for Humans há</p>
        <p className="mt-2 flex items-baseline gap-2 font-mono tabular-nums text-ink">
          <span className="display text-3xl text-accent">{time.years}</span>
          <span className="text-xs text-muted">anos</span>
          <span className="display text-3xl text-ink">{time.days}</span>
          <span className="text-xs text-muted">dias</span>
          <span className="ml-auto text-xs text-ink-soft">{time.clock}</span>
        </p>
        <p className="mt-1 text-xs text-muted">De estagiário a gerente, desde setembro de 2021.</p>
      </section>

      <section className="mt-2 rounded-lg bg-surface-2 p-3">
        <p className="label text-muted">{next.label}</p>
        <p className="mt-2 font-medium leading-snug text-ink">{next.talk.title}</p>
        <p className="mt-0.5 text-xs text-muted">
          {next.talk.event} · {next.talk.dateLabel}
        </p>
      </section>

      <div className="mt-2 grid grid-cols-3 gap-2">
        {toggles.map(({ label, icon: Icon, onClick }) => (
          <button
            key={label}
            type="button"
            role="menuitem"
            onClick={onClick}
            className="flex flex-col items-center gap-1.5 rounded-lg bg-surface-2 px-2 py-3 text-[11px] text-ink-soft transition-colors hover:bg-accent-tint hover:text-accent"
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      <a
        role="menuitem"
        href={mailto("Convite para palestra")}
        className="mt-2 flex items-center justify-between rounded-lg bg-accent px-3 py-2.5 text-sm font-medium text-accent-ink transition-opacity hover:opacity-90"
      >
        Convidar para uma palestra
        <ArrowUpRight size={15} />
      </a>

      <p className="mt-3 px-1 font-mono text-[10px] text-muted">
        build {build.sha}
        {builtAt ? ` · ${builtAt}` : ""}
      </p>
    </div>
  )
}
