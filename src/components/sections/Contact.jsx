import { ArrowUpRight, Github, Linkedin, Mail, PenLine } from "lucide-react"
import { SectionTitle } from "../ui/SectionTitle"
import { Reveal } from "../ui/Reveal"
import { site, contactIntents, mailto } from "../../data/site"

const links = [
  { href: `mailto:${site.email}`, icon: Mail, label: "Email", text: site.email },
  { href: site.github, icon: Github, label: "GitHub", text: "github.com/luisricar-do" },
  { href: site.linkedin, icon: Linkedin, label: "LinkedIn", text: "linkedin.com/in/luisricar-do" },
  { href: site.substack, icon: PenLine, label: "Substack", text: "substack.com/@luisricar" },
]

export function Contact() {
  return (
    <section id="contato" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionTitle index="07" eyebrow="Contato" title="Vamos conversar." />

      <Reveal className="mt-10 max-w-2xl">
        <p className="text-pretty text-lg leading-relaxed text-ink-soft md:text-xl">
          IA no seu time de engenharia, uma oportunidade ou um convite. Escolha o
          motivo e o email já sai com o assunto certo. Respondo pessoalmente.
        </p>
      </Reveal>

      <Reveal delay={0.04} className="mt-10">
        <ul className="grid gap-3 md:grid-cols-3">
          {contactIntents.map((intent) => (
            <li key={intent.id}>
              <a
                href={mailto(intent.subject)}
                className="group flex h-full items-start justify-between gap-4 rounded-xl border border-line p-5 transition-colors hover:border-accent hover:bg-accent-tint"
              >
                <span className="min-w-0">
                  <span className="block font-medium text-ink">{intent.label}</span>
                  <span className="mt-1 block text-sm text-muted">{intent.hint}</span>
                </span>
                <ArrowUpRight
                  size={18}
                  className="mt-0.5 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </a>
            </li>
          ))}
        </ul>
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
        <ul className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
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
