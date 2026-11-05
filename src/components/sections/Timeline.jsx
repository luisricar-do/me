import { useMemo, useState } from "react"
import { SectionTitle } from "../ui/SectionTitle"
import { Reveal } from "../ui/Reveal"
import { timelineEntries } from "../../data/timeline"

/**
 * Três grupos visuais em vez de seis cores: o dado guarda a categoria fina,
 * a tela mostra só o que ajuda a ler a trajetória.
 */
const GROUP = {
  work: { token: "--cat-work", label: "Trabalho e projetos" },
  education: { token: "--cat-education", label: "Formação" },
  stage: { token: "--cat-speaking", label: "Palco e comunidade" },
}

const GROUP_OF = {
  work: "work",
  project: "work",
  education: "education",
  speaking: "stage",
  community: "stage",
  achievement: "stage",
}

const FILTERS = Object.entries(GROUP).map(([key, value]) => ({ key, ...value }))

/** Quantos anos aparecem antes de "ver tudo": o recente conta a história. */
const RECENT_YEARS = 3

export function Timeline() {
  const [filter, setFilter] = useState(null)
  const [expanded, setExpanded] = useState(false)

  const groups = useMemo(() => {
    const visible = filter
      ? timelineEntries.filter((entry) => GROUP_OF[entry.category] === filter)
      : timelineEntries

    const byYear = new Map()
    for (const entry of visible) {
      if (!byYear.has(entry.year)) byYear.set(entry.year, [])
      byYear.get(entry.year).push(entry)
    }

    // Mais recente primeiro; dentro do ano, mantém a ordem cronológica
    return [...byYear.entries()].sort((a, b) => b[0] - a[0])
  }, [filter])

  const visibleGroups = expanded ? groups : groups.slice(0, RECENT_YEARS)
  const hidden = groups.length - visibleGroups.length

  return (
    <section id="trajetoria" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionTitle
        index="06"
        eyebrow="Trajetória"
        title="Linha do tempo."
        lead="Nada disso estava no plano, porque nunca teve plano. Teve curiosidade e correção de rota."
      />

      <Reveal className="mt-12 flex flex-wrap gap-2 md:mt-16">
        <FilterChip active={filter === null} onClick={() => setFilter(null)}>
          Tudo
        </FilterChip>
        {FILTERS.map((item) => (
          <FilterChip
            key={item.key}
            active={filter === item.key}
            token={item.token}
            onClick={() => setFilter((current) => (current === item.key ? null : item.key))}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: `var(${item.token})` }}
              aria-hidden
            />
            {item.label}
          </FilterChip>
        ))}
      </Reveal>

      <div key={filter ?? "all"} className="fade-swap mt-10">
        {visibleGroups.map(([year, entries]) => (
          <div
            key={year}
            className="grid gap-4 border-t border-line py-8 md:grid-cols-[7rem_1fr] md:gap-10"
          >
            <p className="display self-start text-3xl text-muted md:sticky md:top-28 md:text-4xl">
              {year}
            </p>
            <ul>
              {entries.map((entry) => (
                <TimelineEntry key={entry.id} entry={entry} />
              ))}
            </ul>
          </div>
        ))}

        {groups.length === 0 && (
          <p className="border-t border-line py-10 text-sm text-muted">
            Nada nessa categoria ainda.
          </p>
        )}

        {hidden > 0 && (
          <div className="border-t border-line pt-8">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-ink-soft transition-colors hover:border-accent hover:text-accent"
            >
              Ver linha do tempo completa
              <span className="font-mono text-[11px] text-muted">
                +{hidden} {hidden === 1 ? "ano" : "anos"}
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

function FilterChip({ active, token, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[11px] transition-colors duration-200 ${
        active ? "border-ink bg-ink text-paper" : "border-line text-muted hover:border-ink hover:text-ink"
      }`}
      style={active && token ? { borderColor: `var(${token})` } : undefined}
    >
      {children}
    </button>
  )
}

function TimelineEntry({ entry }) {
  const category = GROUP[GROUP_OF[entry.category]]
  const Icon = entry.icon
  const color = `var(${category.token})`

  return (
    <li className="grid grid-cols-[auto_1fr] gap-4 border-b border-line-soft py-4 last:border-b-0">
      <span
        className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full"
        style={{ background: `color-mix(in oklab, ${color} 14%, transparent)`, color }}
        aria-hidden
      >
        <Icon size={13} />
      </span>

      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <p className="text-pretty text-[0.95rem] font-medium leading-snug text-ink">
            {entry.title}
            {entry.current && (
              <span
                className="ml-2 inline-block rounded-full px-2 py-0.5 align-middle font-mono text-[10px]"
                style={{ background: `color-mix(in oklab, ${color} 16%, transparent)`, color }}
              >
                agora
              </span>
            )}
          </p>
          <span className="label shrink-0 text-muted">{entry.date}</span>
        </div>
        <p className="mt-1 text-pretty text-sm leading-relaxed text-muted">{entry.subtitle}</p>
      </div>
    </li>
  )
}
