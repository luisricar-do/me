import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"
import { SectionTitle } from "../ui/SectionTitle"
import { Reveal } from "../ui/Reveal"
import { site } from "../../data/site"

const links = [
  { href: `mailto:${site.email}`, icon: Mail, label: "Email", text: site.email },
  { href: site.github, icon: Github, label: "GitHub", text: "github.com/luisricar-do" },
  { href: site.linkedin, icon: Linkedin, label: "LinkedIn", text: "linkedin.com/in/luisricar-do" },
]

export function Contact() {
  return (
    <section id="contato" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionTitle index="06" eyebrow="Contato" title="Vamos conversar?" />

      <Reveal className="mt-10 max-w-2xl">
        <p className="text-pretty text-lg leading-relaxed text-ink-soft md:text-xl">
          Estou aberto a novas oportunidades, projetos, palestras e conversas
          sobre engenharia, governança e IA. O caminho mais curto é o email.
        </p>
      </Reveal>

      <Reveal delay={0.08} className="mt-12">
        <a
          href={`mailto:${site.email}`}
          className="group inline-flex items-start gap-3 text-ink transition-colors hover:text-accent"
        >
          <span className="display text-[clamp(1.75rem,5.5vw,3.5rem)] break-all">
            {site.email}
          </span>
          <ArrowUpRight
            size={24}
            className="mt-2 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
          />
        </a>
      </Reveal>

      <Reveal delay={0.14} className="mt-14">
        <ul className="grid gap-0 sm:grid-cols-3">
          {links.map(({ href, icon: Icon, label, text }) => (
            <li key={label} className="border-t border-line">
              <a
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="group flex items-center gap-3 py-5 pr-4 transition-colors"
              >
                <Icon
                  size={16}
                  className="shrink-0 text-muted transition-colors group-hover:text-accent"
                />
                <span className="min-w-0">
                  <span className="label block text-muted">{label}</span>
                  <span className="mt-1 block truncate text-sm text-ink-soft transition-colors group-hover:text-ink">
                    {text}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
