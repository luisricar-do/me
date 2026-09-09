import { ArrowUp, Github, Linkedin, Mail } from "lucide-react"
import { site } from "../../data/site"
import { Mark } from "../ui/Mark"
import { build, formattedBuildDate } from "../../lib/build"

const social = [
  { href: site.github, icon: Github, label: "GitHub" },
  { href: site.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: `mailto:${site.email}`, icon: Mail, label: "Email" },
]

export function Footer() {
  const deployedAt = formattedBuildDate()

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Mark size={26} />
            <p className="display text-2xl text-ink">{site.name}</p>
          </div>
          <p className="mt-1 text-sm text-muted">
            © {new Date().getFullYear()} · {site.tagline}
          </p>

          {/* Um site de DevOps que não mostra o próprio deploy é uma piada perdida */}
          <p className="mt-5 font-mono text-[11px] text-muted">
            <a
              href={`${site.repo}/commit/${build.sha}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-soft transition-colors hover:text-accent"
            >
              {build.sha}
            </a>
            <span className="mx-1.5">·</span>
            {build.ref}
            {deployedAt && (
              <>
                <span className="mx-1.5">·</span>
                deploy em {deployedAt}
              </>
            )}
          </p>
        </div>

        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-4">
            {social.map(({ href, icon: Icon, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:border-accent hover:text-accent"
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#hero"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            Topo
            <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  )
}
