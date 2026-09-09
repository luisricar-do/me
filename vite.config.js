import { execSync } from "node:child_process"
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

const ORIGIN = "https://luisr.com.br"

/**
 * Rotas do client-side router que também viram arquivo real no build.
 * Sem isso o GitHub Pages responde 404 nelas: a página até carrega, via
 * 404.html, mas o status quebra indexação e preview de link.
 */
const ROUTES = [
  {
    path: "ia",
    title: "Onde a IA não deve entrar | Régua de autonomia",
    description:
      "A régua de autonomia que apresentei no HackTown 2026. Responda seis perguntas sobre uma tarefa e descubra que nível de autonomia ela aceita: copiloto, agente ou autônomo.",
    image: `${ORIGIN}/og-ia.png`,
  },
  {
    path: "eduflow",
    title: "EduFlow | Case",
    description:
      "Sistema low-code configurável para gestão de trabalhos de conclusão de curso, avaliado com usuários e publicado no IEEE IISA 2025.",
  },
]

function git(command, fallback) {
  try {
    return execSync(command, { stdio: ["ignore", "pipe", "ignore"] }).toString().trim()
  } catch {
    return fallback
  }
}

const escapeAttribute = (value) => value.replace(/"/g, "&quot;")

/** Troca o conteúdo de uma tag sem interpretar $ e & como grupos de captura. */
function replaceTag(html, pattern, value) {
  return html.replace(pattern, (match, prefix) => `${prefix}${escapeAttribute(value)}`)
}

function staticRoutes() {
  return {
    name: "static-routes",
    apply: "build",
    closeBundle() {
      const index = readFileSync(resolve("dist/index.html"), "utf8")

      // Fallback para qualquer caminho não previsto (ex. links antigos)
      writeFileSync(resolve("dist/404.html"), index)

      for (const route of ROUTES) {
        let html = index
        html = html.replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`)
        html = replaceTag(html, /(<meta name="description" content=")[^"]*/, route.description)
        html = replaceTag(html, /(<meta property="og:title" content=")[^"]*/, route.title)
        html = replaceTag(html, /(<meta property="og:description" content=")[^"]*/, route.description)
        html = replaceTag(html, /(<meta name="twitter:title" content=")[^"]*/, route.title)
        html = replaceTag(html, /(<meta name="twitter:description" content=")[^"]*/, route.description)
        html = replaceTag(html, /(<meta property="og:url" content=")[^"]*/, `${ORIGIN}/${route.path}`)
        html = replaceTag(html, /(<link rel="canonical" href=")[^"]*/, `${ORIGIN}/${route.path}`)
        if (route.image) {
          html = replaceTag(html, /(<meta property="og:image" content=")[^"]*/, route.image)
          html = replaceTag(html, /(<meta name="twitter:image" content=")[^"]*/, route.image)
        }

        mkdirSync(resolve(`dist/${route.path}`), { recursive: true })
        writeFileSync(resolve(`dist/${route.path}/index.html`), html)
      }
    },
  }
}

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss(), staticRoutes()],
  define: {
    __BUILD_SHA__: JSON.stringify(git("git rev-parse --short HEAD", "dev")),
    __BUILD_REF__: JSON.stringify(git("git rev-parse --abbrev-ref HEAD", "local")),
    __BUILT_AT__: JSON.stringify(new Date().toISOString()),
  },
})
