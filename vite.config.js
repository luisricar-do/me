import { execSync } from "node:child_process"
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
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
    "Luis Ricardo Santos, desenvolvimento, cloud e IA aplicada. Tudo numa página só: projetos, serviços, palestras, trajetória e contato.",
}

const ROUTES = [
  {
    // A home abre a janela "Sobre mim": mesmo conteúdo, então a raiz é a canônica
    path: "sobre",
    canonical: "",
    title: "Sobre mim · Luis Ricardo Santos",
    description:
      "Quem sou e como posso ajudar: sites e sistemas, consultoria de IA, cloud e DevOps, palestras e mentoria.",
  },
  {
    path: "projetos",
    title: "Projetos · Luis Ricardo Santos",
    description: "Sites, sistemas e ferramentas com IA que eu construí, do código à produção.",
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
    path: "escrita",
    title: "Escrita · Luis Ricardo Santos",
    description: "Big Rick, minha newsletter no Substack: um assunto de IA por edição, explicado sem jargão.",
  },
  {
    path: "contato",
    title: "Contato · Luis Ricardo Santos",
    description: "Um site, um sistema, consultoria de IA, palestra ou mentoria: me conta o que você precisa.",
  },
  {
    path: "terminal",
    noindex: true,
    title: "Terminal · Luis Ricardo Santos",
    description: "O site por linha de comando.",
  },
  {
    path: "arquivos",
    noindex: true,
    title: "Arquivos · Luis Ricardo Santos",
    description: "Projetos, artigos e fotos de palestras organizados como pastas.",
  },
  {
    path: "lixeira",
    noindex: true,
    title: "Lixeira · Luis Ricardo Santos",
    description: "O que ficou pelo caminho.",
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
      // Preload das duas fontes da primeira dobra (texto e títulos, em latim):
      // o navegador começa a baixar junto com o CSS, sem esperar descobrir
      const fonts = readdirSync(resolve("dist/assets")).filter((name) =>
        /^(inter-latin-opsz-normal|fraunces-latin-full-normal)-.*\.woff2$/.test(name)
      )
      const preload = fonts
        .map((name) => `<link rel="preload" href="/assets/${name}" as="font" type="font/woff2" crossorigin />`)
        .join("\n    ")
      const index = readFileSync(resolve("dist/index.html"), "utf8").replace(
        "</head>",
        `  ${preload}\n  </head>`
      )
      writeFileSync(resolve("dist/index.html"), index)

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
        // Com barra no fim: é a URL que o GitHub Pages serve sem redirecionar
        const target = route.canonical ?? route.path
        const canonical = target ? `${ORIGIN}/${target}/` : `${ORIGIN}/`
        html = replaceTag(html, /(<meta property="og:url" content=")[^"]*/, canonical)
        html = replaceTag(html, /(<link rel="canonical" href=")[^"]*/, canonical)
        if (route.noindex) {
          html = html.replace(
            /(<meta name="description"[^>]*>)/,
            `$1\n    <meta name="robots" content="noindex, follow" />`
          )
        }
        // Imagem de compartilhamento da seção (public/og, gerada com `npm run og`)
        const ogFile = `og/${target || "home"}.png`
        const image = route.image ?? (existsSync(resolve("public", ogFile)) ? `${ORIGIN}/${ogFile}` : null)
        if (image) {
          html = replaceTag(html, /(<meta property="og:image" content=")[^"]*/, image)
          html = replaceTag(html, /(<meta name="twitter:image" content=")[^"]*/, image)
        }

        mkdirSync(resolve(`dist/${route.path}`), { recursive: true })
        writeFileSync(resolve(`dist/${route.path}/index.html`), html)
      }

      // Sitemap só com as páginas que devem aparecer na busca, cada uma pela
      // URL canônica; as versões simples que apontam para a interativa ficam fora
      const indexable = ROUTES.filter((route) => !route.noindex && route.canonical === undefined)
      const urls = ["", ...indexable.map((route) => `${route.path}/`)]
      const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...urls.map((path) => `  <url><loc>${ORIGIN}/${path}</loc></url>`),
        "</urlset>",
        "",
      ].join("\n")
      writeFileSync(resolve("dist/sitemap.xml"), sitemap)
      writeFileSync(
        resolve("dist/robots.txt"),
        `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`
      )
    },
  }
}

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss(), staticRoutes()],
  build: {
    rollupOptions: {
      output: {
        // React e o router mudam pouco: num chunk próprio, ficam no cache entre deploys
        manualChunks(id) {
          if (/node_modules\/(react|react-dom|react-router|scheduler)\//.test(id)) return "vendor"
        },
      },
    },
  },
  define: {
    __BUILD_SHA__: JSON.stringify(git("git rev-parse --short HEAD", "dev")),
    __BUILD_REF__: JSON.stringify(git("git rev-parse --abbrev-ref HEAD", "local")),
    __BUILT_AT__: JSON.stringify(new Date().toISOString()),
  },
})
