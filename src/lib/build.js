// Injetados no build pelo define do Vite
export const build = {
  sha: __BUILD_SHA__,
  ref: __BUILD_REF__,
  at: __BUILT_AT__,
}

export function formattedBuildDate() {
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(build.at))
  } catch {
    return null
  }
}
