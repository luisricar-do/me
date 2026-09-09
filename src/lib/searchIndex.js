import { site } from "../data/site"
import { talks, talkKinds } from "../data/talks"
import { publications } from "../data/publications"
import { projects } from "../data/projects"
import { timelineEntries } from "../data/timeline"

const SECTIONS = [
  ["sobre", "Sobre"],
  ["destaques", "Destaques e publicações"],
  ["palestras", "Palestras"],
  ["projetos", "Projetos"],
  ["trajetoria", "Trajetória"],
  ["contato", "Contato"],
]

/** Tudo que a paleta ⌘K sabe encontrar, montado a partir dos mesmos dados das seções. */
export function buildIndex() {
  const entries = [
    ...SECTIONS.map(([id, label]) => ({
      group: "Seções",
      label,
      hint: `#${id}`,
      action: { type: "scroll", to: id },
    })),
    {
      group: "Páginas",
      label: "Régua de autonomia",
      hint: "Onde a IA não deve entrar",
      action: { type: "route", to: "/ia" },
    },
    {
      group: "Páginas",
      label: "EduFlow",
      hint: "Case completo",
      action: { type: "route", to: "/eduflow" },
    },
    ...talks.map((talk) => ({
      group: "Palestras",
      label: talk.title,
      hint: `${talkKinds[talk.kind]} · ${talk.dateLabel}`,
      action: { type: "scroll", to: "palestras" },
    })),
    ...publications.map((paper) => ({
      group: "Publicações",
      label: paper.title,
      hint: `${paper.venue} · ${paper.place}`,
      action: paper.href
        ? { type: "external", to: paper.href }
        : { type: "scroll", to: "destaques" },
    })),
    ...projects.map((project) => ({
      group: "Projetos",
      label: project.title,
      hint: project.dateFormatted(),
      action: { type: "external", to: project.href },
    })),
    ...timelineEntries.map((item) => ({
      group: "Trajetória",
      label: item.title,
      hint: item.date,
      action: { type: "scroll", to: "trajetoria" },
    })),
    {
      group: "Ações",
      label: "Alternar tema",
      hint: "claro e escuro",
      action: { type: "theme" },
    },
    {
      group: "Ações",
      label: "Copiar email",
      hint: site.email,
      action: { type: "copy", value: site.email },
    },
    {
      group: "Ações",
      label: "LinkedIn",
      hint: "linkedin.com/in/luisricar-do",
      action: { type: "external", to: site.linkedin },
    },
    {
      group: "Ações",
      label: "GitHub",
      hint: "github.com/luisricar-do",
      action: { type: "external", to: site.github },
    },
  ]

  return entries.map((item, id) => ({
    id,
    ...item,
    key: normalize(item.label),
    haystack: normalize(`${item.label} ${item.hint} ${item.group}`),
  }))
}

/** Sem acento e sem caixa: buscar "trajetoria" tem que achar "Trajetória". */
export function normalize(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
}

/**
 * Ranking em seis níveis, do rótulo para o resto e do início de palavra para
 * o meio dela: sem isso "tema" casa dentro de "systematic" e o artigo passa
 * na frente de "Alternar tema".
 */
export function search(index, query, limit = 40) {
  const needle = normalize(query.trim())
  if (!needle) return index.slice(0, limit)

  const scored = []
  for (const item of index) {
    const inKey = item.key.indexOf(needle)
    let score = null

    if (inKey === 0) score = 0
    else if (startsWord(item.key, needle)) score = 1
    else if (inKey > 0) score = 2
    else if (item.haystack.includes(needle)) score = 3
    else if (isSubsequence(needle, item.key)) score = 4
    else if (needle.length >= 3 && isSubsequence(needle, item.haystack)) score = 5

    if (score !== null) scored.push([score, item])
  }

  return scored
    .sort((a, b) => a[0] - b[0] || a[1].id - b[1].id)
    .slice(0, limit)
    .map(([, item]) => item)
}

/** O trecho começa uma palavra? Separa "Alternar tema" de "systematic". */
function startsWord(text, needle) {
  let from = 0
  for (;;) {
    const at = text.indexOf(needle, from)
    if (at < 1) return false
    if (/[^a-z0-9]/.test(text[at - 1])) return true
    from = at + 1
  }
}

function isSubsequence(needle, haystack) {
  let cursor = 0
  for (const char of haystack) {
    if (char === needle[cursor]) cursor += 1
    if (cursor === needle.length) return true
  }
  return needle.length === 0
}
