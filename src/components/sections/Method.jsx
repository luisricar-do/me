import { ArrowUpRight } from "lucide-react"
import { SectionTitle } from "../ui/SectionTitle"
import { Reveal } from "../ui/Reveal"
import { Button } from "../ui/Button"
import { method, pitch } from "../../data/pitch"
import { mailto, primarySubject } from "../../data/site"

/** Os três passos entre a primeira conversa e a coisa rodando sem mim. */
export function Method() {
  return (
    <section id="como-trabalho" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionTitle
        index="02"
        eyebrow="Como eu trabalho"
        title="Do problema à coisa rodando."
        lead="Sem slide de transformação digital. Três passos, e cada um termina em algo que dá para ver funcionando."
      />

      <ol className="mt-14 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-8">
        {method.map(({ step, title, body }, i) => (
          <Reveal as="li" key={step} delay={i * 0.08} className="border-t border-line pt-6">
            <span className="font-mono text-sm text-accent tabular-nums">{step}</span>
            <h3 className="display mt-4 text-2xl text-ink md:text-[1.75rem]">{title}</h3>
            <p className="mt-3 text-pretty leading-relaxed text-muted">{body}</p>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={0.2} className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-4">
        <Button href={mailto(primarySubject)}>
          {pitch.primaryCta}
          <ArrowUpRight size={16} />
        </Button>
        <span className="text-sm text-muted">Respondo pessoalmente, sem formulário.</span>
      </Reveal>
    </section>
  )
}
