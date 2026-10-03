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
const SIMPLE = {
  title: "Luis Ricardo Santos | Versão simples",
  description:
    "Luis Ricardo Santos, Gerente de Governança de TI e IA na Tech for Humans. Tudo numa página só: palestras, trajetória, publicações e contato.",
}

const ROUTES = [
  {
    path: "sobre",
    title: "Sobre mim · Luis Ricardo Santos",
    description:
      "Quem sou e como posso ajudar: palestras, governança de TI e IA, mentoria e avaliação.",
  },
  {
    path: "palestras",
    title: "Palestras · Luis Ricardo Santos",
    description: "Onde já falei e sobre o quê: IA na engenharia, governança e carreira em tecnologia.",
  },
  {
    path: "trajetoria",
    title: "Trajetória · Luis Ricardo Santos",
    description: "Minha carreira, ano a ano: de estagiário a Gerente de Governança de TI e IA.",
  },
  {
    path: "publicacoes",
    title: "Publicações · Luis Ricardo Santos",
    description: "Artigos científicos publicados no IEEE e projetos.",
  },
  {
    path: "contato",
    title: "Contato · Luis Ricardo Santos",
    description: "Convites para palestra, mentoria, banca ou oportunidades.",
  },
  {
    path: "terminal",
    title: "Terminal · Luis Ricardo Santos",
    description: "O site por linha de comando.",
  },
  { path: "simples", ...SIMPLE },
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

// A versão simples das páginas longas aponta o canonical para a interativa
for (const path of ["ia", "eduflow"]) {
  const route = ROUTES.find((item) => item.path === path)
  ROUTES.push({ ...route, path: `simples/${path}`, canonical: path })
}

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
        const canonical = `${ORIGIN}/${route.canonical ?? route.path}`
        html = replaceTag(html, /(<meta property="og:url" content=")[^"]*/, canonical)
        html = replaceTag(html, /(<link rel="canonical" href=")[^"]*/, canonical)
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
