/** Papéis de parede do modo computador. O desenho de cada um está em Wallpaper.jsx. */
export const WALLPAPERS = [
  { id: "marinho", label: "Marinho" },
  { id: "aurora", label: "Aurora" },
  { id: "regua", label: "Régua" },
  { id: "pontos", label: "Pontos" },
]

export const DEFAULT_WALLPAPER = "marinho"

export function isWallpaper(id) {
  return WALLPAPERS.some((item) => item.id === id)
}
