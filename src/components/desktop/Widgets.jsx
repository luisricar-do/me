import { ArrowUpRight, BookOpen, Mic } from "lucide-react"
import { site } from "../../data/site"
import { publications } from "../../data/publications"
import { stage } from "../../lib/agenda"
import { daysUntil, tenure } from "../../lib/tenure"
import { useNow } from "../../hooks/useNow"

const latestPaper = [...publications].sort((a, b) => b.date.localeCompare(a.date))[0]

function countdown(days) {
  if (days === 0) return "é hoje"
  if (days === 1) return "amanhã"
  if (days > 1) return `faltam ${days} dias`
  if (days === -1) return "foi ontem"
  return `há ${-days} dias`
}

function Card({ onClick, label, children, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`group block w-full rounded-2xl border border-line-soft bg-surface/70 p-4 text-left shadow-[var(--shadow-card)] backdrop-blur-xl transition-colors hover:border-accent ${className}`}
    >
      {children}
    </button>
  )
}

/**
 * Widgets da mesa, como os do macOS: ficam atrás das janelas e mostram o
 * que está acontecendo agora. Tudo sai de src/data, nada é digitado aqui.
 */
export function Widgets({ onLaunch }) {
  const now = useNow(60_000)
  const time = tenure(now)
  const next = stage(now)
  const days = daysUntil(next.talk.date, now)

  return (
    <aside
      aria-label="Widgets"
      data-desk-item
      className="absolute right-4 top-4 hidden w-[17.5rem] flex-col gap-3 xl:flex"
    >
      <Card onClick={() => onLaunch("sobre")} label="Agora: abrir Sobre mim">
        <p className="label text-muted">Agora</p>
        <p className="mt-2 font-medium leading-snug text-ink">{site.role}</p>
        <p className="text-sm text-ink-soft">{site.company}</p>
        <p className="mt-3 flex items-baseline gap-1.5 font-mono text-xs text-muted tabular-nums">
          <span className="display text-2xl text-accent">{time.years}</span> anos
          <span className="display ml-1 text-2xl text-ink">{time.days}</span> dias de casa
        </p>
      </Card>

      <Card onClick={() => onLaunch("palestras")} label={`${next.label}: abrir Palestras`}>
        <p className="label flex items-center gap-1.5 text-muted">
          <Mic size={11} /> {next.label}
        </p>
        <p className="display mt-2 text-xl leading-tight text-ink">{next.talk.title}</p>
        <p className="mt-1 text-xs text-muted">{next.talk.event}</p>
        <p className="mt-3 inline-flex rounded-full bg-accent-tint px-2.5 py-1 font-mono text-[11px] text-accent">
          {countdown(days)}
        </p>
      </Card>

      {latestPaper && (
        <Card onClick={() => onLaunch("publicacoes")} label="Último artigo: abrir Publicações">
          <p className="label flex items-center gap-1.5 text-muted">
            <BookOpen size={11} /> {latestPaper.venue}
          </p>
          <p className="mt-2 line-clamp-3 text-sm font-medium leading-snug text-ink">{latestPaper.title}</p>
          <p className="mt-2 text-xs text-muted">{latestPaper.status}</p>
        </Card>
      )}

      <button
        type="button"
        onClick={() => onLaunch("contato")}
        className="sticky-note group relative mt-1 rotate-[-2deg] rounded-sm bg-coral p-4 text-left text-[#1a1917] shadow-[0_14px_30px_-14px_rgba(0,0,0,0.45)] transition-transform hover:rotate-0"
      >
        <span aria-hidden className="absolute -top-2 left-1/2 h-4 w-14 -translate-x-1/2 rotate-2 bg-white/50" />
        <p className="display text-xl italic leading-snug">
          Tem um projeto, uma palestra ou uma ideia? Me chama.
        </p>
        <p className="mt-3 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider">
          Fale comigo <ArrowUpRight size={12} />
        </p>
      </button>
    </aside>
  )
}
