/**
 * Renderiza as peças de marca (brand/<canal>/src/*.html) em PNG 2x, ao lado
 * da pasta src. Roda à mão quando uma peça muda: `npm run brand -- github`
 * (sem argumento, renderiza todos os canais). Usa o mesmo Chrome do og.mjs.
 */
import { existsSync, readdirSync } from "node:fs"
import { basename, resolve } from "node:path"
import { pathToFileURL } from "node:url"
import puppeteer from "puppeteer-core"

const CHROME = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean).find((path) => existsSync(path))

const channels = process.argv.slice(2).length
  ? process.argv.slice(2)
  : readdirSync(resolve("brand"), { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)

async function main() {
  if (!CHROME) throw new Error("brand: Chrome não encontrado (defina CHROME_PATH)")
  const browser = await puppeteer.launch({ executablePath: CHROME, args: ["--allow-file-access-from-files"] })
  try {
    const page = await browser.newPage()
    for (const channel of channels) {
      const src = resolve("brand", channel, "src")
      for (const file of readdirSync(src).filter((name) => name.endsWith(".html"))) {
        await page.goto(pathToFileURL(resolve(src, file)).href, { waitUntil: "networkidle0" })
        await page.evaluate(() => document.fonts.ready)
        const { width, height } = await page.evaluate(() => ({
          width: document.body.offsetWidth,
          height: document.body.offsetHeight,
        }))
        await page.setViewport({ width, height, deviceScaleFactor: 2 })
        const out = resolve("brand", channel, `${basename(file, ".html")}.png`)
        await page.screenshot({ path: out, omitBackground: true })
        console.log(`brand: ${out}`)
      }
    }
  } finally {
    await browser.close()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
