import { ArrowUpRight } from "lucide-react"
import { SectionTitle } from "../ui/SectionTitle"
import { Reveal } from "../ui/Reveal"
import { Button } from "../ui/Button"
import { writing } from "../../data/writing"

export function Writing() {
  return (
    <section id="escrita" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionTitle index="02" eyebrow="Escrita" title={writing.title} />

      <Reveal className="mt-14 grid gap-10 rounded-xl border border-line p-7 md:mt-20 md:grid-cols-[1.2fr_0.8fr] md:items-end md:gap-14 md:p-10">
        <div className="min-w-0">
          <p className="label text-accent">Substack · {writing.handle}</p>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-ink-soft">{writing.body}</p>
          <div className="mt-8">
            <Button href={writing.href} target="_blank" rel="noopener noreferrer">
              Ler e assinar no Substack
              <ArrowUpRight size={16} />
            </Button>
          </div>
        </div>

        <div className="min-w-0">
          <p className="label text-muted">Sobre o que escrevo</p>
          <ul className="mt-4">
            {writing.topics.map((topic) => (
              <li key={topic} className="border-t border-line-soft py-3 text-sm text-ink-soft last:border-b">
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  )
}
