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
    id: "hardtech-2024",
    src: "/images/photos/hardtech-2024.jpg",
    caption: "HardTech Innovation 2024",
    detail: "HardTech Innovation",
    sub: "Maio de 2024",
  },
  {
    id: "google",
    src: "/images/photos/google.jpg",
    caption: "Evento no escritório do Google",
    detail: "Google",
    sub: "Junho de 2024",
  },
  {
    id: "hoffman-lideres",
    src: "/images/photos/hoffman-lideres.jpg",
    caption: "Educação para Líderes",
    detail: "Instituto Hoffman",
    sub: "Setembro de 2024",
  },
  {
    id: "formatura",
    src: "/images/photos/formatura.jpg",
    caption: "Formatura em Sistemas de Informação",
    detail: "UNIFEI",
    sub: "Orador da turma · 2025",
  },
  {
    id: "cats-presidente",
    src: "/images/photos/cats-presidente.jpg",
    caption: "Presidente do CATS",
    detail: "CATS · UNIFEI",
    sub: "2022",
  },
  {
    id: "startup-weekend-2025",
    src: "/images/talks/startup-weekend-2025.jpg",
    caption: "Participante no Startup Weekend 2025",
    detail: "Startup Weekend Smart Cities",
    sub: "Participante · 2025",
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
