import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Reveal } from "../ui/Reveal"
import { builtWith } from "../../data/builtWith"
import { levels } from "../../data/aiRuler"
import { build, formattedBuildDate } from "../../lib/build"
import { site } from "../../data/site"

const level = levels[builtWith.level]

export function BuiltWith() {
  const deployedAt = formattedBuildDate()

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <Reveal className="grid gap-10 border-t border-line pt-10 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
        <div className="min-w-0">
          <p className="label text-accent">Sobre este site</p>
          <h2 className="display mt-5 text-balance text-[clamp(1.75rem,4.5vw,2.75rem)] text-ink">
            Este site rodou no nível {level.code} · {level.name}.
          </h2>
          <div className="mt-6 space-y-4">
            {builtWith.body.map((paragraph) => (
              <p key={paragraph} className="max-w-xl text-pretty leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
          <p className="mt-6 max-w-xl text-pretty text-sm leading-relaxed text-ink-soft">
            {builtWith.note}
          </p>

          <Link
            to="/ia"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
          >
            <span className="link-underline">Ver a régua que define isso</span>
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="min-w-0">
          <p className="label text-muted">Registro</p>
          <dl className="mt-5">
            <div className="flex items-baseline justify-between gap-6 border-t border-line-soft py-4">
              <dt className="label text-muted">Commit</dt>
              <dd>
                <a
                  href={`${site.repo}/commit/${build.sha}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-ink transition-colors hover:text-accent"
                >
                  {build.sha}
                </a>
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-6 border-t border-line-soft py-4">
              <dt className="label text-muted">Branch</dt>
              <dd className="font-mono text-sm text-ink">{build.ref}</dd>
            </div>
            {deployedAt && (
              <div className="flex items-baseline justify-between gap-6 border-t border-line-soft py-4 last:border-b">
                <dt className="label text-muted">Deploy</dt>
                <dd className="font-mono text-sm text-ink">{deployedAt}</dd>
              </div>
            )}
          </dl>
          <p className="mt-5 font-mono text-[11px] text-muted">
            {level.motto} · {level.description.toLowerCase()}
          </p>
        </div>
      </Reveal>
    </section>
  )
}
