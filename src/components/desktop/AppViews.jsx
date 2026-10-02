import { Link } from "react-router-dom"
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"
import { site, contactIntents, mailto } from "../../data/site"
import { about } from "../../data/about"
import { talks, talkKinds } from "../../data/talks"
import { publications } from "../../data/publications"
import { projects } from "../../data/projects"
import { timelineEntries } from "../../data/timeline"
import { coreQuestion } from "../../data/aiRuler"
import { AutonomyRuler } from "../ia/AutonomyRuler"
import { closeDesktop } from "../../lib/desktop"

/*
 * O conteúdo de cada janela. Tudo vem de src/data, então o desktop mostra
 * o mesmo que a home, só em outro formato.
 */

const TOKEN_OF = {
  work: "--cat-work",
  project: "--cat-work",
  education: "--cat-education",
  speaking: "--cat-speaking",
  community: "--cat-speaking",
  achievement: "--cat-speaking",
}

function Pane({ eyebrow, title, children }) {
  return (
    <div className="p-5 md:p-7">
      <p className="label text-accent">{eyebrow}</p>
      <h2 className="display mt-3 text-balance text-2xl text-ink md:text-3xl">{title}</h2>
      <div className="mt-6">{children}</div>
    </div>
  )
}

export function AboutView() {
  return (
    <Pane eyebrow="me.txt" title={site.name}>
      <p className="text-sm text-ink-soft">
        {site.role} · {site.company}
      </p>
      <p className="mt-4 text-pretty leading-relaxed text-muted">
        Cheguei em tecnologia por engano e fiquei por escolha. Há {about.yearsAtCompany} anos na
        Tech for Humans, de estagiário a gerente. Cuido para que a IA entre na engenharia pelo
        lugar certo: o que automatizar, o que continua com gente e como provar que está tudo sob
        controle, LGPD incluída.
      </p>
      <dl className="mt-6">
        {about.stack.map((group) => (
          <div
            key={group.area}
            className="grid grid-cols-[6rem_1fr] gap-3 border-t border-line-soft py-3 last:border-b"
          >
            <dt className="label pt-0.5 text-muted">{group.area}</dt>
            <dd className="text-sm text-ink-soft">{group.items.join(" · ")}</dd>
          </div>
        ))}
      </dl>
    </Pane>
  )
}

export function TalksView() {
  const ordered = [...talks].sort((a, b) => b.date.localeCompare(a.date))
  return (
    <Pane eyebrow="palestras" title="O que eu levei para o palco.">
      <ul className="space-y-3">
        {ordered.map((talk) => (
          <li key={talk.id} className="flex gap-4 rounded-lg border border-line-soft p-3">
            {talk.photo ? (
              <img
                src={talk.photo}
                alt=""
                loading="lazy"
                className="h-16 w-20 shrink-0 rounded-md object-cover"
              />
            ) : (
              <span className="label grid h-16 w-20 shrink-0 place-items-center rounded-md bg-surface-2 text-muted">
                {talkKinds[talk.kind]}
              </span>
            )}
            <div className="min-w-0">
              <p className="font-medium text-ink">{talk.title}</p>
              <p className="mt-0.5 text-sm text-muted">{talk.event}</p>
              <p className="label mt-1.5 text-muted">{talk.dateLabel}</p>
              {talk.thesis && <p className="mt-2 text-sm italic text-ink-soft">“{talk.thesis}”</p>}
            </div>
          </li>
        ))}
      </ul>
    </Pane>
  )
}

export function RulerView() {
  return (
    <Pane eyebrow="regua.app" title={coreQuestion}>
      <p className="mb-6 text-sm text-muted">
        Seis perguntas sobre uma tarefa dizem que nível de autonomia ela aceita.{" "}
        <Link to="/ia" onClick={closeDesktop} className="text-accent link-underline">
          Ver a página completa
        </Link>
      </p>
      <AutonomyRuler />
    </Pane>
  )
}

export function TimelineView() {
  const ordered = [...timelineEntries].reverse()
  return (
    <Pane eyebrow="trajetoria.md" title={`${timelineEntries.length} marcos desde 2017.`}>
      <ol className="relative border-l border-line pl-5">
        {ordered.map((entry) => {
          const Icon = entry.icon
          const color = `var(${TOKEN_OF[entry.category] ?? "--cat-work"})`
          return (
            <li key={entry.id} className="relative pb-5 last:pb-0">
              <span
                aria-hidden
                style={{ color, borderColor: color }}
                className="absolute -left-[31px] top-0.5 grid h-5 w-5 place-items-center rounded-full border bg-surface"
              >
                <Icon size={11} />
              </span>
              <p className="label text-muted">{entry.date}</p>
              <p className="mt-1 font-medium text-ink">{entry.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{entry.subtitle}</p>
            </li>
          )
        })}
      </ol>
    </Pane>
  )
}

export function HighlightsView() {
  return (
    <Pane eyebrow="publicacoes.md" title="Artigos e projetos.">
      <ul className="space-y-3">
        {publications.map((paper) => (
          <li key={paper.id} className="rounded-lg border border-line-soft p-4">
            <p className="label text-accent">{paper.venue}</p>
            <p className="mt-2 font-medium leading-snug text-ink">{paper.title}</p>
            <p className="mt-1 text-sm text-muted">
              {paper.place} · {paper.status}
            </p>
            {paper.href && (
              <a
                href={paper.href}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-sm text-accent link-underline"
              >
                IEEE Xplore <ArrowUpRight size={13} />
              </a>
            )}
          </li>
        ))}
        {projects.map((project) => (
          <li key={project.id} className="rounded-lg border border-line-soft p-4">
            <p className="label text-muted">Projeto · {project.dateFormatted()}</p>
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1 font-medium text-ink hover:text-accent"
            >
              {project.title} <ArrowUpRight size={14} />
            </a>
            <p className="mt-1 text-sm text-muted">{project.description}</p>
          </li>
        ))}
      </ul>
    </Pane>
  )
}

const LINKS = [
  { href: `mailto:${site.email}`, icon: Mail, text: site.email },
  { href: site.linkedin, icon: Linkedin, text: "linkedin.com/in/luisricar-do" },
  { href: site.github, icon: Github, text: "github.com/luisricar-do" },
]

export function ContactView() {
  return (
    <Pane eyebrow="contato" title="Me chama para o próximo palco.">
      <ul className="space-y-2">
        {contactIntents.map((intent) => (
          <li key={intent.id}>
            <a
              href={mailto(intent.subject)}
              className="group flex items-start justify-between gap-3 rounded-lg border border-line p-4 transition-colors hover:border-accent hover:bg-accent-tint"
            >
              <span className="min-w-0">
                <span className="block font-medium text-ink">{intent.label}</span>
                <span className="mt-0.5 block text-sm text-muted">{intent.hint}</span>
              </span>
              <ArrowUpRight size={16} className="mt-0.5 shrink-0 text-muted group-hover:text-accent" />
            </a>
          </li>
        ))}
      </ul>
      <ul className="mt-6 space-y-2">
        {LINKS.map(({ href, icon: Icon, text }) => (
          <li key={href}>
            <a
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 text-sm text-ink-soft hover:text-accent"
            >
              <Icon size={15} className="text-muted" />
              {text}
            </a>
          </li>
        ))}
      </ul>
    </Pane>
  )
}
