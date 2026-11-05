import { ArrowUpRight, Github } from "lucide-react"
import { SiteLink } from "../ui/SiteLink"
import { SectionTitle } from "../ui/SectionTitle"
import { Reveal } from "../ui/Reveal"
import { projects } from "../../data/projects"
import { mailto } from "../../data/site"

export function Projects() {
  return (
    <section id="projetos" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionTitle
        index="01"
        eyebrow="Projetos"
        title="O que eu construí."
        lead="Sites, sistemas e ferramentas com IA, do código à produção. Alguns estão no ar, outros têm o código aberto."
      />

      <ul className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:mt-20 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal as="li" key={project.id} delay={(i % 2) * 0.06} className="flex">
            <ProjectCard project={project} />
          </Reveal>
        ))}
        <Reveal as="li" delay={(projects.length % 2) * 0.06} className="flex">
          <a
            href={mailto("Projeto: site ou sistema")}
            className="group flex w-full flex-col justify-between bg-accent-tint p-7 transition-colors hover:bg-accent hover:text-accent-ink md:p-8"
          >
            <p className="label text-accent transition-colors group-hover:text-accent-ink">Próximo</p>
            <div className="mt-10">
              <p className="display text-2xl text-ink transition-colors group-hover:text-accent-ink md:text-[1.75rem]">
                O seu projeto.
              </p>
              <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors group-hover:text-accent-ink">
                Me conta o que você precisa
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </p>
            </div>
          </a>
        </Reveal>
      </ul>
    </section>
  )
}

function ProjectCard({ project }) {
  return (
    <article
      className={`flex w-full flex-col bg-paper p-7 md:p-8 ${
        project.draft ? "outline-2 -outline-offset-8 outline-dashed outline-line" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="label text-accent">{project.kind}</span>
        <span className="font-mono text-[11px] text-muted">{project.year}</span>
        {project.draft && (
          <span className="ml-auto rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-muted">
            rascunho · só no dev
          </span>
        )}
      </div>

      <h3 className="display mt-5 text-2xl text-ink md:text-[1.75rem]">{project.title}</h3>
      <p className="mt-3 flex-1 text-pretty leading-relaxed text-muted">{project.summary}</p>

      {project.stack.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      <ProjectLinks project={project} className="mt-6" />
    </article>
  )
}

/** Os links que o projeto tiver: no ar, case e código. Compartilhado com a janela de Projetos. */
export function ProjectLinks({ project, className = "" }) {
  const linkClass =
    "group inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-accent"
  if (!project.href && !project.caseHref && !project.repo) return null

  return (
    <div className={`flex flex-wrap items-center gap-x-5 gap-y-2 ${className}`}>
      {project.caseHref && (
        <SiteLink to={project.caseHref} className={linkClass}>
          <span className="link-underline">Ver o case</span>
          <ArrowUpRight size={14} />
        </SiteLink>
      )}
      {project.href && (
        <a href={project.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <span className="link-underline">Ver no ar</span>
          <ArrowUpRight size={14} />
        </a>
      )}
      {project.repo && (
        <a href={project.repo} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <Github size={14} />
          <span className="link-underline">Código</span>
        </a>
      )}
    </div>
  )
}
