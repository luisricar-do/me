/**
 * Fotos que não são de palco: retratos e momentos. As de palestra e mentoria
 * ficam no campo `photo` de src/data/talks.js. Tudo é servido já reduzido
 * (1200px no lado maior, sem metadados) e o robots.txt tira /images/ do
 * Google Imagens.
 */
/** Avatar quadrado (rosto recortado de retrato.jpg) para contato e "Sobre mim". */
export const portrait = {
  src: "/images/photos/avatar.jpg",
  alt: "Luis Ricardo Santos sorrindo",
}

export const photos = [
  {
    id: "startup-weekend-2025",
    src: "/images/talks/startup-weekend-2025.jpg",
    caption: "Startup Weekend 2025",
    detail: "Startup Weekend",
    sub: "Smart Cities · 2025",
  },
  { id: "retrato", src: "/images/photos/retrato.jpg", caption: "Retrato", detail: "Retrato", sub: "Tech for Humans" },
  {
    id: "retrato-perfil",
    src: "/images/photos/retrato-perfil.jpg",
    caption: "Retrato",
    detail: "Retrato",
    sub: "Tech for Humans",
  },
  {
    id: "retrato-estudio",
    src: "/images/photos/retrato-estudio.jpg",
    caption: "Retrato em estúdio",
    detail: "Retrato",
    sub: "Ensaio",
  },
  {
    id: "retrato-sofa",
    src: "/images/photos/retrato-sofa.jpg",
    caption: "Retrato",
    detail: "Retrato",
    sub: "Ensaio",
  },
  { id: "mar", src: "/images/photos/mar.jpg", caption: "A favorita", detail: "Fora do expediente", sub: "No mar" },
]
