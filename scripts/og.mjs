/**
 * Gera as imagens de compartilhamento (Open Graph, 1200×630) de cada seção em
 * public/og/. Roda à mão quando um título muda: `npm run og`. As imagens
 * ficam no repositório, então o build não depende disto.
 *
 * Mesmo desenho do og-image.png: fundo escuro, brilho marinho, a régua com a
 * última barra em coral e o título em Fraunces com a palavra-chave em itálico.
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { pathToFileURL } from "node:url"
import puppeteer from "puppeteer-core"

export const OG_PAGES = [
  {
    path: "projetos",
    label: "Projetos",
    title: "O que eu <em>construí.</em>",
    sub: "Plataformas, ferramentas e sistemas, do código à produção.",
  },
  {
    path: "palestras",
    label: "Palestras",
    title: "O que eu levei para o <em>palco.</em>",
    sub: "Palestras, mentorias e presenças em evento.",
  },
  {
    path: "trajetoria",
    label: "Trajetória",
    title: "Linha do <em>tempo.</em>",
    sub: "De estagiário a Gerente de Governança de TI e IA.",
  },
  {
    path: "publicacoes",
    label: "Publicações",
    title: "Artigos <em>publicados.</em>",
    sub: "Pesquisa em IA e sistemas, publicada no IEEE IISA 2025 e 2026.",
  },
  {
    path: "escrita",
    label: "Escrita · Big Rick",
    title: "Entenda a IA que você <em>já usa.</em>",
    sub: "Um assunto de IA por edição, explicado sem jargão.",
  },
  {
    path: "contato",
    label: "Contato",
    title: "Me conta o que você <em>precisa.</em>",
    sub: "Governança, IA, palestra, mentoria ou uma oportunidade.",
  },
  {
    path: "eduflow",
    label: "Case · IEEE IISA 2025",
    title: "Edu<em>Flow</em>",
    sub: "Sistema low-code para gestão de TCCs, avaliado com usuários.",
  },
]

const CHROME = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean).find((path) => existsSync(path))

const font = (file) => pathToFileURL(resolve("node_modules/@fontsource-variable", file)).href

const CSS = `
@font-face { font-family: Fraunces; font-style: normal; font-weight: 100 900; src: url(${font("fraunces/files/fraunces-latin-full-normal.woff2")}); }
@font-face { font-family: Fraunces; font-style: italic; font-weight: 100 900; src: url(${font("fraunces/files/fraunces-latin-full-italic.woff2")}); }
@font-face { font-family: Mono; font-weight: 100 900; src: url(${font("jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2")}); }
@font-face { font-family: Inter; font-weight: 100 900; src: url(${font("inter/files/inter-latin-opsz-normal.woff2")}); }
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: 1200px; height: 630px; overflow: hidden; }
body { position: relative; color: #edece8; -webkit-font-smoothing: antialiased; font-family: Inter, sans-serif;
  background: radial-gradient(80% 90% at 85% 110%, rgba(14,53,157,.42) 0%, transparent 65%),
              radial-gradient(40% 50% at 100% 0%, rgba(255,96,106,.08) 0%, transparent 70%), #0b0b0d; }
.logo { position: absolute; left: 72px; top: 60px; display: flex; align-items: center; gap: 16px; }
.logo span { display: flex; flex-direction: column; gap: 6px; }
.logo i { display: block; height: 8px; border-radius: 2px; background: #edece8; }
.logo b { font: 500 21px Inter; letter-spacing: -0.01em; }
.label { position: absolute; left: 72px; top: 196px; font: 500 20px Mono; letter-spacing: .08em; text-transform: uppercase; color: #7b9bff; }
h1 { position: absolute; left: 70px; top: 236px; width: 1060px; font: 500 92px/100px Fraunces, serif;
  font-variation-settings: "SOFT" 32, "WONK" 1; letter-spacing: -0.02em; }
h1 em { font-style: italic; color: #ff606a; }
.sub { position: absolute; left: 72px; bottom: 96px; width: 760px; font-size: 24px; line-height: 34px; color: #c6c4be; }
.url { position: absolute; right: 72px; bottom: 100px; font: 500 20px Mono; color: #8d8b85; }
`

function html(page) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>
<div class="logo"><span><i style="width:18px"></i><i style="width:28px"></i><i style="width:38px;background:#ff606a"></i></span><b>Luis Ricardo Santos</b></div>
<p class="label">${page.label}</p>
<h1>${page.title}</h1>
<p class="sub">${page.sub}</p>
<p class="url">luisr.com.br/${page.path}</p>
</body></html>`
}

async function main() {
  if (!CHROME) throw new Error("og: Chrome não encontrado (defina CHROME_PATH)")
  mkdirSync(resolve("public/og"), { recursive: true })
  // A página vai para um arquivo local para poder carregar as fontes do node_modules
  const scratch = resolve("node_modules/.cache/og")
  mkdirSync(scratch, { recursive: true })
  const browser = await puppeteer.launch({ executablePath: CHROME, args: ["--allow-file-access-from-files"] })
  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1200, height: 630 })
    for (const item of OG_PAGES) {
      const file = resolve(scratch, `${item.path}.html`)
      writeFileSync(file, html(item))
      await page.goto(pathToFileURL(file).href, { waitUntil: "load" })
      await page.evaluate(() => document.fonts.ready)
      await page.screenshot({ path: resolve(`public/og/${item.path}.png`) })
      console.log(`og: public/og/${item.path}.png`)
    }
  } finally {
    await browser.close()
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}
