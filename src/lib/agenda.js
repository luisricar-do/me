import { talks } from "../data/talks"

/** O próximo evento na agenda; sem nenhum marcado, o mais recente. */
export function stage(now) {
  const today = now.toISOString().slice(0, 10)
  const upcoming = talks.filter((talk) => talk.date >= today).sort((a, b) => a.date.localeCompare(b.date))
  if (upcoming.length) return { label: "Próximo palco", talk: upcoming[0] }
  const past = [...talks].sort((a, b) => b.date.localeCompare(a.date))
  return { label: "Último palco", talk: past[0] }
}
