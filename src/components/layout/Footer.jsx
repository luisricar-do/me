import { motion } from "framer-motion"
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react"
import { site } from "../../data/site"

const social = [
  { href: site.github, icon: Github, label: "GitHub" },
  { href: site.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: `https://wa.me/${site.whatsapp}`, icon: MessageCircle, label: "WhatsApp" },
  { href: `mailto:${site.email}`, icon: Mail, label: "Email" },
]

export function Footer() {
  return (
    <motion.footer
      className="border-t border-[var(--color-ink)]/10 bg-[var(--color-paper-elevated)]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-6xl px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-[var(--color-muted)]">
          © {new Date().getFullYear()} {site.name}. Feito por mim.
        </p>
        <ul className="flex items-center gap-6">
          {social.map(({ href, icon: Icon, label }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
                aria-label={label}
              >
                <Icon size={20} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.footer>
  )
}
