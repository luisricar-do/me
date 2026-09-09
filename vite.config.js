import { execSync } from "node:child_process"
import { copyFileSync, existsSync } from "node:fs"
import { resolve } from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

function git(command, fallback) {
  try {
    return execSync(command, { stdio: ["ignore", "pipe", "ignore"] }).toString().trim()
  } catch {
    return fallback
  }
}

/**
 * O GitHub Pages não conhece as rotas do client-side router: serve 404.html
 * para qualquer caminho desconhecido. Duplicar o index.html como 404.html faz
 * /ia e /eduflow funcionarem em acesso direto e em refresh.
 */
function spaFallback() {
  return {
    name: "spa-fallback",
    apply: "build",
    closeBundle() {
      const index = resolve("dist/index.html")
      if (existsSync(index)) copyFileSync(index, resolve("dist/404.html"))
    },
  }
}

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss(), spaFallback()],
  define: {
    __BUILD_SHA__: JSON.stringify(git("git rev-parse --short HEAD", "dev")),
    __BUILD_REF__: JSON.stringify(git("git rev-parse --abbrev-ref HEAD", "local")),
    __BUILT_AT__: JSON.stringify(new Date().toISOString()),
  },
})
