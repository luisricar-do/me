import { Link } from "react-router-dom"
import { ArrowUpRight, Github, Linkedin, Mail, PenLine } from "lucide-react"
import { site, contactIntents, mailto } from "../../data/site"
import { about, proof } from "../../data/about"
import { services } from "../../data/services"
import { talks, talkKinds } from "../../data/talks"
import { writing } from "../../data/writing"
import { publications } from "../../data/publications"
import { projects } from "../../data/projects"
import { timelineEntries } from "../../data/timeline"
import { Mark } from "../ui/Mark"
import { AiRuler } from "../../pages/AiRuler"
import { Eduflow } from "../../pages/Eduflow"

/*
 * O conteúdo de cada janela. Tudo vem de src/data, então a versão
 * interativa mostra o mesmo que a versão simples, só em outro formato.
 */

export function RulerIcon({ size }) {
  return <Mark size={size} />
}

export function RulerView() {
  return <AiRuler embedded />
}

export function EduflowView() {
  return <Eduflow embedded />
}

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
    <div className="p-5 md:p-7">
      <p className="label text-accent">Boas-vindas</p>
      <h1 className="display mt-3 text-balance text-3xl text-ink md:text-4xl">
        Uso IA para a engenharia <span className="italic text-accent">funcionar melhor.</span>
      </h1>
      <p className="mt-5 text-pretty leading-relaxed text-ink-soft">
        Sou {site.name}, {site.role} na {site.company}. Cheguei em tecnologia
        por engano e fiquei por escolha: há {about.yearsAtCompany} anos lá, de dev fullstack a
        DevOps a gerente. Levo IA para dentro do fluxo de engenharia: o que automatizar, o que
        continua com gente e como provar que está tudo sob controle.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <a
          href={mailto("Conversa sobre IA na engenharia")}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent hover:text-accent-ink"
        >
          Falar sobre IA no seu time <ArrowUpRight size={15} />
        </a>
        <a
          href={writing.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
        >
          Ler no Substack <ArrowUpRight size={15} />
        </a>
        <Link
          to="/ia"
          className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
        >
          Testar a Régua de IA
        </Link>
      </div>

      <h2 className="label mt-10 text-muted">Como posso ajudar</h2>
      <ul className="mt-4 space-y-3">
        {services.map(({ id, icon: Icon, title, body, subject }) => (
          <li key={id} className="flex gap-4 rounded-lg border border-line-soft p-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-tint text-accent">
              <Icon size={16} />
            </span>
            <div className="min-w-0">
              <p className="font-medium text-ink">{title}</p>
              <p className="mt-1 text-pretty text-sm leading-relaxed text-muted">{body}</p>
              <a
                href={mailto(subject)}
                className="mt-2 inline-flex items-center gap-1 text-sm text-accent link-underline"
              >
                Falar sobre isso <ArrowUpRight size={13} />
              </a>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="label mt-10 text-muted">Na prática</h2>
      <p className="mt-3 text-sm text-ink-soft">{proof.join(" · ")}</p>

      <h2 className="label mt-10 text-muted">No que eu trabalho</h2>
      <dl className="mt-3">
        {about.stack.map((group) => (
          <div
            key={group.area}
            className="grid grid-cols-[6.5rem_1fr] gap-3 border-t border-line-soft py-3 last:border-b"
          >
            <dt className="label pt-0.5 text-muted">{group.area}</dt>
            <dd className="text-sm text-ink-soft">{group.items.join(" · ")}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export function TalksView() {
  const ordered = [...talks].sort((a, b) => b.date.localeCompare(a.date))
  return (
    <Pane eyebrow="Palestras" title="Também levo isso para o palco.">
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

export function WritingView() {
  return (
    <Pane eyebrow={`Substack · ${writing.handle}`} title={writing.title}>
      <p className="text-pretty leading-relaxed text-ink-soft">{writing.body}</p>
      <ul className="mt-6">
        {writing.topics.map((topic) => (
          <li key={topic} className="border-t border-line-soft py-3 text-sm text-ink-soft last:border-b">
            {topic}
          </li>
        ))}
      </ul>
      <a
        href={writing.href}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent hover:text-accent-ink"
      >
        Ler e assinar no Substack <ArrowUpRight size={15} />
      </a>
    </Pane>
  )
}

export function TimelineView() {
  const ordered = [...timelineEntries].reverse()
  return (
    <Pane eyebrow="Trajetória" title={`${timelineEntries.length} marcos desde 2017.`}>
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
    <Pane eyebrow="Publicações" title="Artigos e projetos.">
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
            {paper.caseHref && (
              <Link
                to={paper.caseHref}
                className="ml-4 mt-2 inline-flex items-center gap-1 text-sm text-accent link-underline"
              >
                Ver o case
              </Link>
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
  { href: site.substack, icon: PenLine, text: "substack.com/@luisricar" },
]

export function ContactView() {
  return (
    <Pane eyebrow="Contato" title="Vamos conversar.">
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
