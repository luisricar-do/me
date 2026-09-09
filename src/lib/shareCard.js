const WIDTH = 1200
const HEIGHT = 630
const PAD = 72

const INK = "#edece8"
const MUTED = "#8d8b85"
const ACCENT = "#4ade80"
const PAPER = "#0b0b0d"
const ALERT = "#ff9a8b"

const mono = (size, weight = 500) => `${weight} ${size}px "JetBrains Mono", ui-monospace, monospace`
const display = (size) => `500 ${size}px Fraunces, Georgia, serif`

/** Quebra o texto na largura disponível e devolve as linhas usadas. */
function wrap(ctx, text, maxWidth, maxLines = 3) {
  const words = text.split(/\s+/)
  const lines = []
  let line = ""

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word
    if (ctx.measureText(candidate).width <= maxWidth || !line) {
      line = candidate
    } else {
      lines.push(line)
      line = word
      if (lines.length === maxLines) break
    }
  }
  if (lines.length < maxLines && line) lines.push(line)

  if (lines.length === maxLines) {
    let last = lines[maxLines - 1]
    while (last && ctx.measureText(`${last}…`).width > maxWidth) {
      last = last.slice(0, -1)
    }
    lines[maxLines - 1] = last === lines[maxLines - 1] ? last : `${last}…`
  }
  return lines
}

/** A marca: três barras crescentes, verde só na terceira. */
function drawMark(ctx, x, y, scale) {
  const bars = [
    [10, INK],
    [16, INK],
    [22, ACCENT],
  ]
  bars.forEach(([width, color], i) => {
    ctx.fillStyle = color
    ctx.fillRect(x, y + i * 9 * scale, width * scale, 5 * scale)
  })
}

/**
 * Desenha o card de resultado da régua para a pessoa baixar e postar.
 * Devolve um Blob PNG.
 */
export async function drawResultCard({ result, task, levels }) {
  if (document.fonts?.load) {
    await Promise.all([
      document.fonts.load(display(104)),
      document.fonts.load(mono(24)),
    ]).catch(() => {})
  }

  const canvas = document.createElement("canvas")
  canvas.width = WIDTH
  canvas.height = HEIGHT
  const ctx = canvas.getContext("2d")

  ctx.fillStyle = PAPER
  ctx.fillRect(0, 0, WIDTH, HEIGHT)
  ctx.textBaseline = "alphabetic"

  // Cabeçalho
  ctx.font = mono(20)
  ctx.fillStyle = ACCENT
  ctx.fillText("RÉGUA DE AUTONOMIA", PAD, PAD + 14)
  ctx.fillStyle = MUTED
  const url = "LUISR.COM.BR/IA"
  ctx.fillText(url, WIDTH - PAD - ctx.measureText(url).width, PAD + 14)

  drawMark(ctx, PAD, PAD + 46, 2.2)

  let y = 250

  if (task) {
    ctx.font = mono(22)
    ctx.fillStyle = MUTED
    for (const line of wrap(ctx, `> ${task}`, WIDTH - PAD * 2, 2)) {
      ctx.fillText(line, PAD, y)
      y += 34
    }
    y += 26
  }

  if (result.blocked) {
    ctx.font = mono(26)
    ctx.fillStyle = ALERT
    ctx.fillText("ANTES DO NÍVEL", PAD, y)
    y += 66

    ctx.font = display(64)
    ctx.fillStyle = INK
    for (const line of wrap(ctx, result.blocked[0].title, WIDTH - PAD * 2, 2)) {
      ctx.fillText(line, PAD, y)
      y += 72
    }

    ctx.font = mono(20)
    ctx.fillStyle = MUTED
    ctx.fillText("nenhum nível de autonomia foi liberado", PAD, HEIGHT - PAD)
  } else {
    const level = result.levelInfo

    ctx.font = mono(26)
    ctx.fillStyle = ACCENT
    ctx.fillText(`NÍVEL ${level.code}`, PAD, y)
    y += 96

    ctx.font = display(104)
    ctx.fillStyle = INK
    ctx.fillText(level.name, PAD, y)
    y += 52

    ctx.font = mono(24)
    ctx.fillStyle = MUTED
    ctx.fillText(level.motto.toLowerCase(), PAD, y)

    ctx.fillStyle = ACCENT
    ctx.fillRect(PAD, HEIGHT - PAD - 62, 80, 2)

    ctx.font = mono(20)
    ctx.fillStyle = MUTED
    const cap =
      result.cap < 3 ? ` · teto pela regra de ouro: ${levels[result.cap].name.toLowerCase()}` : ""
    ctx.fillText(`score ${result.score}/${result.max}${cap}`, PAD, HEIGHT - PAD)
  }

  return new Promise((resolve) => canvas.toBlob(resolve, "image/png"))
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
