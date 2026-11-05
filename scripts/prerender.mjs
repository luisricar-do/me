/**
 * Pré-renderização: depois do `vite build`, abre cada página do dist num
 * Chrome headless e grava o HTML já montado dentro do #root. Assim quem não
 * executa JavaScript (Bing, prévias de link, crawlers de IA) lê o conteúdo, e
 * o Google não precisa esperar a fila de renderização para indexar.
 *
 * No navegador o React monta por cima normalmente (createRoot substitui o
 * conteúdo); até lá o HTML pré-renderizado fica escondido para quem tem JS,
 * para não piscar o desktop numa tela de celular.
 *
 * Sem Chrome na máquina o passo é pulado com um aviso. No CI, PRERENDER_REQUIRED=1
 * faz a falta virar erro, para nunca publicar sem o conteúdo no HTML.
 */
import { createServer } from "node:http"
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs"
import { extname, join, resolve } from "node:path"
import puppeteer from "puppeteer-core"

const DIST = resolve("dist")
const PORT = 4173
const ROOT_TAG = '<div id="root"></div>'

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium-browser",
  "/usr/bin/chromium",
].filter(Boolean)

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".xml": "application/xml",
  ".txt": "text/plain",
}

/** Todas as páginas geradas: o index da raiz e o de cada rota. */
function pages(dir = DIST, base = "") {
  const found = []
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) {
      if (name !== "assets" && name !== "images") found.push(...pages(full, `${base}/${name}`))
    } else if (name === "index.html") {
      found.push({ url: `${base}/`, file: full })
    }
  }
  return found
}

/** Servidor estático mínimo, que responde como o GitHub Pages: /rota/ → /rota/index.html. */
function serve() {
  const server = createServer((req, res) => {
    const path = decodeURIComponent(new URL(req.url, "http://x").pathname)
    let file = join(DIST, path)
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html")
    if (!existsSync(file)) {
      res.writeHead(404, { "content-type": TYPES[".html"] })
      res.end(readFileSync(join(DIST, "404.html")))
      return
    }
    res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" })
    res.end(readFileSync(file))
  })
  return new Promise((done) => server.listen(PORT, "127.0.0.1", () => done(server)))
}

async function main() {
  const chrome = CHROME_CANDIDATES.find((path) => existsSync(path))
  if (!chrome) {
    const message = "prerender: Chrome não encontrado; HTML sai sem conteúdo pré-renderizado."
    if (process.env.PRERENDER_REQUIRED === "1") throw new Error(message)
    console.warn(message)
    return
  }

  const server = await serve()
  const browser = await puppeteer.launch({ executablePath: chrome, args: ["--no-sandbox"] })
  const list = pages()

  try {
    for (const { url, file } of list) {
      const page = await browser.newPage()
      await page.setViewport({ width: 1440, height: 900 })
      // Sem boot, notificação e dica: o retrato é o desktop já pronto para ler
      await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }])
      await page.evaluateOnNewDocument(() => {
        localStorage.setItem("desktop-hint-seen", "1")
        sessionStorage.setItem("desktop-booted", "1")
        sessionStorage.setItem("desktop-toast", "1")
      })
      await page.goto(`http://127.0.0.1:${PORT}${url}`, { waitUntil: "networkidle0" })
      await page.waitForSelector("#root > *")
      await new Promise((done) => setTimeout(done, 300))
      const body = await page.$eval("#root", (root) => root.innerHTML)
      await page.close()

      const html = readFileSync(file, "utf8")
      if (!html.includes(ROOT_TAG)) throw new Error(`prerender: #root não encontrado em ${file}`)
      writeFileSync(file, html.replace(ROOT_TAG, () => `<div id="root" data-prerendered>${body}</div>`))
      console.log(`prerender: ${url} (${Math.round(body.length / 1024)} KB)`)
    }
  } finally {
    await browser.close()
    server.close()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
