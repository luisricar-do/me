import { ArrowUpRight } from "lucide-react"
import { SectionTitle } from "../ui/SectionTitle"
import { Reveal } from "../ui/Reveal"
import { services } from "../../data/services"
import { mailto } from "../../data/site"

export function Services() {
  return (
    <section id="atuacao" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionTitle
        index="01"
        eyebrow="Atuação"
        title="Onde eu posso ajudar."
        lead="Três formas de trabalhar comigo. Todas partem da mesma pergunta: o que a IA deve fazer aqui, e o que não deve."
      />

      <ul className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:mt-20 md:grid-cols-3">
        {services.map(({ id, icon: Icon, title, body, proof, subject }, i) => (
          <Reveal as="li" key={id} delay={i * 0.06} className="flex flex-col bg-paper p-7 md:p-8">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-accent-tint text-accent">
              <Icon size={16} />
            </span>
            <h3 className="display mt-6 text-2xl text-ink md:text-[1.75rem]">{title}</h3>
            <p className="mt-3 flex-1 text-pretty leading-relaxed text-muted">{body}</p>
            <p className="mt-6 border-t border-line-soft pt-4 font-mono text-[11px] text-ink-soft">
              {proof}
            </p>
            <a
              href={mailto(subject)}
              className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
            >
              <span className="link-underline">Falar sobre isso</span>
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
