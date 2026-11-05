import { START_AT_COMPANY } from "../data/about"

const DAY = 86_400_000
const two = (value) => String(value).padStart(2, "0")

/** Tempo de casa desde o primeiro dia, decomposto para virar contador. */
export function tenure(now) {
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

/** Dias inteiros entre hoje e uma data ISO (positivo = no futuro). */
export function daysUntil(iso, now) {
  const target = new Date(`${iso}T00:00:00`)
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return Math.round((target - today) / DAY)
}
