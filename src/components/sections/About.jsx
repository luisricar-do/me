import { SectionTitle } from "../ui/SectionTitle"
import { Reveal } from "../ui/Reveal"
import { about } from "../../data/about"

const stats = [
  { value: String(about.yearsAtCompany), label: "anos na Tech for Humans" },
  { value: "2", label: "artigos no IEEE (IISA 2025 e 2026)" },
  { value: "MSc", label: "IA na UNIFEI, em andamento" },
]

export function About() {
  return (
    <section id="sobre" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionTitle
        index="03"
        eyebrow="Sobre"
        title="Cheguei por engano. Fiquei por escolha."
      />

      <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        <div className="min-w-0">
          <Reveal className="space-y-5">
            <p className="text-pretty text-lg leading-relaxed text-ink-soft md:text-xl">
              Entrei em tecnologia sem querer. Me matriculei no técnico achando que era
              Eletrônica e descobri no primeiro dia que a vaga era de Informática. Fiquei.
            </p>
            <p className="text-pretty leading-relaxed text-muted">
              Em 2021, um hackathon pediu praticamente o projeto que eu tinha feito de TCC:
              chat, WebSocket, Node e React. Ganhamos, e o prêmio era um estágio na{" "}
              <span className="text-ink-soft">Tech for Humans</span>. {about.yearsAtCompany} anos
              depois, sou <strong className="font-medium text-ink">Gerente de Governança de TI e IA</strong>{" "}
              lá, com um time de 8 pessoas.
            </p>
            <p className="text-pretty leading-relaxed text-muted">
              No caminho escrevi código fullstack, fundei a área de DevOps, assumi o papel de
              DPO e aprendi uma coisa: governança boa entra no desenho, não chega no fim como
              checklist. Hoje aplico isso à IA, decidindo onde ela acelera o time e onde ela não
              deve entrar.
            </p>
            <p className="text-pretty leading-relaxed text-muted">
              Em paralelo, faço mestrado em IA na <span className="text-ink-soft">UNIFEI</span>,
              publiquei dois artigos no IEEE e mentoro times em hackathons, do Startup Weekend ao
              NASA Space Apps.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-12 grid grid-cols-3 gap-6 border-t border-line pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="display text-4xl text-accent md:text-5xl">{stat.value}</p>
                <p className="mt-2 text-xs leading-snug text-muted">{stat.label}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.08} className="min-w-0">
          <p className="label text-muted">Onde eu atuo</p>
          <dl className="mt-5">
            {about.stack.map((group) => (
              <div
                key={group.area}
                className="grid grid-cols-[6.5rem_1fr] gap-4 border-t border-line-soft py-4 last:border-b"
              >
                <dt className="label pt-1 text-muted">{group.area}</dt>
                <dd className="flex flex-wrap gap-x-2 gap-y-1 text-sm text-ink-soft">
                  {group.items.map((item, i) => (
                    <span key={item}>
                      {item}
                      {i < group.items.length - 1 && (
                        <span className="ml-2 text-muted">·</span>
                      )}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
