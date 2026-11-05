import { ArrowUpRight, Minimize2, Moon, Search, Sun } from "lucide-react"
import { stage } from "../../lib/agenda"
import { mailto } from "../../data/site"
import { build, formattedBuildDate } from "../../lib/build"
import { openCommandPalette } from "../../lib/palette"
import { useNow } from "../../hooks/useNow"
import { useTheme } from "../../hooks/useTheme"
import { tenure } from "../../lib/tenure"
import { WALLPAPERS } from "../../lib/wallpapers"

const SHORTCUTS = [
  ["⌥ ← →", "encaixar"],
  ["⌥ ↑ ↓", "maximizar"],
  ["⌥ M", "minimizar"],
  ["⌥ W", "fechar"],
  ["⌥ Tab", "alternar"],
  ["⌥ O", "organizar"],
]

/**
 * O popover da marca na menu bar: o equivalente a um app de status, com
 * números que andam sozinhos. Nada inventado: tudo sai dos dados do site.
 */
export function StatusMenu({ onMinimizeAll, onClose, wallpaper, onWallpaper }) {
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

      <section className="mt-2 rounded-lg bg-surface-2 p-3">
        <p className="label text-muted">Papel de parede</p>
        <div className="mt-2 grid grid-cols-4 gap-1.5">
          {WALLPAPERS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="menuitemradio"
              aria-checked={item.id === wallpaper}
              onClick={() => onWallpaper(item.id)}
              className={`flex flex-col items-center gap-1 rounded-md p-1 text-[10px] transition-colors ${
                item.id === wallpaper ? "text-accent" : "text-muted hover:text-ink"
              }`}
            >
              <span
                className={`wall wall-${item.id} relative block h-9 w-full overflow-hidden rounded border ${
                  item.id === wallpaper ? "border-accent" : "border-line"
                }`}
              />
              {item.label}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-2 rounded-lg bg-surface-2 p-3">
        <p className="label text-muted">Atalhos</p>
        <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
          {SHORTCUTS.map(([keys, label]) => (
            <div key={keys} className="flex items-baseline justify-between gap-2">
              <dt className="font-mono text-ink-soft">{keys}</dt>
              <dd className="text-muted">{label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <a
        role="menuitem"
        href={mailto("Projeto: site ou sistema")}
        className="mt-2 flex items-center justify-between rounded-lg bg-accent px-3 py-2.5 text-sm font-medium text-accent-ink transition-opacity hover:opacity-90"
      >
        Falar sobre um projeto
        <ArrowUpRight size={15} />
      </a>

      <p className="mt-3 px-1 font-mono text-[10px] text-muted">
        build {build.sha}
        {builtAt ? ` · ${builtAt}` : ""}
      </p>
    </div>
  )
}
