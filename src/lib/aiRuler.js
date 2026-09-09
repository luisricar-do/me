import { questions, gates, levels } from "../data/aiRuler"

const MAX_SCORE = questions.length * 2

/**
 * Aplica a régua da palestra:
 *  - dois bloqueios (sem dono, processo não escrito) impedem qualquer nível;
 *  - a regra de ouro define o teto pela proximidade de produção/cliente;
 *  - a soma das respostas pode derrubar o nível abaixo desse teto;
 *  - sem registro, nada passa de copiloto.
 */
export function evaluate(answers) {
  const chosen = questions.map((question) => {
    const index = answers[question.id]
    return index == null ? null : { question, option: question.options[index] }
  })

  if (chosen.some((entry) => entry === null)) return null

  const blocking = chosen
    .filter((entry) => entry.option.gate)
    .map((entry) => gates[entry.option.gate])

  const flags = chosen.filter((entry) => entry.option.flag).map((entry) => entry.option.flag)

  const score = chosen.reduce((total, entry) => total + entry.option.value, 0)
  const byId = Object.fromEntries(chosen.map((entry) => [entry.question.id, entry.option.value]))

  if (blocking.length) return { blocked: blocking, flags, score, max: MAX_SCORE }

  const cap = byId.proximidade + 1
  let level = cap
  if (score < 9) level = Math.max(1, cap - 1)
  if (score < 6) level = 1
  if (byId.registro === 0) level = 1

  return { level, levelInfo: levels[level], cap, score, max: MAX_SCORE, flags, blocked: null }
}

/** Respostas viram uma string curta para caber na URL e ser compartilhada. */
export function encodeAnswers(answers) {
  return questions.map((question) => answers[question.id] ?? "-").join("")
}

export function decodeAnswers(code) {
  if (!code || code.length !== questions.length) return {}
  const answers = {}
  questions.forEach((question, i) => {
    const char = code[i]
    const index = Number(char)
    if (Number.isInteger(index) && index >= 0 && index < question.options.length) {
      answers[question.id] = index
    }
  })
  return answers
}
