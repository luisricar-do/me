/**
 * Preferências do modo computador que valem entre visitas: onde cada janela
 * estava e qual papel de parede foi escolhido. Tudo no localStorage do
 * visitante; sem storage (aba anônima, bloqueio) o desktop só volta ao padrão.
 */
const LAYOUT_KEY = "desktop-layout"
const WALLPAPER_KEY = "desktop-wallpaper"

function read(key) {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* sem storage: nada a fazer, o padrão volta na próxima visita */
  }
}

export function readLayout() {
  try {
    return JSON.parse(read(LAYOUT_KEY)) ?? {}
  } catch {
    return {}
  }
}

export function saveLayout(layout) {
  write(LAYOUT_KEY, JSON.stringify(layout))
}

export function readWallpaper(fallback) {
  return read(WALLPAPER_KEY) ?? fallback
}

export function saveWallpaper(id) {
  write(WALLPAPER_KEY, id)
}

/** Uma vez por sessão: boot e notificação não se repetem a cada F5. */
export function seenThisSession(key) {
  try {
    return sessionStorage.getItem(key) === "1"
  } catch {
    return false
  }
}

export function markSeenThisSession(key) {
  try {
    sessionStorage.setItem(key, "1")
  } catch {
    /* sem storage: volta a aparecer no próximo F5, nada de grave */
  }
}
