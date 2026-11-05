import { site } from "../data/site"
import { about } from "../data/about"
import { projects } from "../data/projects"
import { publications } from "../data/publications"
import { talks } from "../data/talks"

/*
 * Dados estruturados (schema.org em JSON-LD). Dizem ao Google quem é a
 * pessoa por trás do site e o que são as coisas listadas nele, o que ajuda a
 * separar este Luis Ricardo Santos dos outros. Tudo sai de src/data.
 */

const ORIGIN = site.url
const PERSON_ID = `${ORIGIN}/#pessoa`
const SITE_ID = `${ORIGIN}/#site`

const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: site.name,
  url: `${ORIGIN}/`,
  image: `${ORIGIN}/images/talks/hacktown-2026.jpg`,
  jobTitle: site.role,
  worksFor: { "@type": "Organization", name: site.company },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Universidade Federal de Itajubá (UNIFEI)" },
  email: `mailto:${site.email}`,
  sameAs: [site.linkedin, site.github, site.substack].filter(Boolean),
  knowsAbout: about.stack.flatMap((group) => group.items),
}

const website = {
  "@type": "WebSite",
  "@id": SITE_ID,
  url: `${ORIGIN}/`,
  name: site.name,
  inLanguage: "pt-BR",
  publisher: { "@id": PERSON_ID },
}

function absolute(href) {
  return href.startsWith("http") ? href : `${ORIGIN}${href}`
}

const articles = publications.map((paper) => ({
  "@type": "ScholarlyArticle",
  headline: paper.title,
  ...(paper.subtitle ? { alternativeHeadline: paper.subtitle } : {}),
  author: { "@id": PERSON_ID },
  datePublished: paper.date,
  inLanguage: "en",
  isPartOf: { "@type": "PublicationEvent", name: paper.venueFull, location: paper.place },
  publisher: { "@type": "Organization", name: "IEEE" },
  ...(paper.href ? { url: paper.href, sameAs: paper.href } : {}),
}))

const events = talks.map((talk) => ({
  "@type": "Event",
  name: talk.kind === "palestra" ? `${talk.title} · ${talk.event}` : talk.title,
  ...(talk.subtitle ? { description: talk.subtitle } : {}),
  startDate: talk.date,
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: { "@type": "Place", name: talk.event, address: talk.location },
  performer: { "@id": PERSON_ID },
  ...(talk.photo ? { image: absolute(talk.photo) } : {}),
}))

const works = projects
  .filter((project) => !project.draft)
  .map((project) => ({
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    creator: { "@id": PERSON_ID },
    dateCreated: String(project.year),
    keywords: project.stack.join(", "),
    ...(project.href ? { url: project.href } : project.caseHref ? { url: absolute(project.caseHref) } : {}),
    ...(project.repo ? { codeRepository: project.repo } : {}),
  }))

/** Cada rota leva a pessoa e o site; as listas vão nas páginas que as mostram. */
export function structuredData(pathname) {
  const path = pathname.replace(/\/+$/, "") || "/"
  const everything = path === "/simples"
  const graph = [person, website]
  if (everything || path === "/publicacoes") graph.push(...articles)
  if (everything || path === "/palestras") graph.push(...events)
  if (everything || path === "/projetos") graph.push(...works)
  return { "@context": "https://schema.org", "@graph": graph }
}
