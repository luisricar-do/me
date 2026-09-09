import { ArrowUpRight } from "lucide-react"
import { SectionTitle } from "../ui/SectionTitle"
import { Reveal } from "../ui/Reveal"
import { projects } from "../../data/projects"

const ordered = [...projects].sort((a, b) => b.date.localeCompare(a.date))

export function Projects() {
  return (
    <section id="projetos" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionTitle
        index="04"
        eyebrow="Projetos"
        title="Trabalhos recentes."
        lead="Coisas que construí por conta própria, por curiosidade ou por necessidade."
      />

      <ul className="mt-14 md:mt-20">
        {ordered.map((project, i) => (
          <Reveal
            as="li"
            key={project.id}
            delay={i * 0.05}
            className="border-t border-line last:border-b"
          >
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid gap-3 py-8 transition-colors md:grid-cols-[8rem_1fr_2rem] md:items-baseline md:gap-8"
            >
              <span className="label text-muted">{project.dateFormatted()}</span>

              <div className="min-w-0">
                <h3 className="display text-[clamp(1.75rem,3.5vw,2.5rem)] text-ink transition-colors duration-300 group-hover:text-accent">
                  {project.title}
                </h3>
                <p className="mt-2.5 max-w-2xl text-pretty text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <ArrowUpRight
                size={20}
                className="hidden justify-self-end text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent md:block"
                aria-hidden
              />
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
