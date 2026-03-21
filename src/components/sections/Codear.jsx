import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ExternalLink, GraduationCap } from "lucide-react"
import { SectionTitle } from "../ui/SectionTitle"
import { codear } from "../../data/codear"

export function Codear() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 0.45])

  return (
    <section
      id="codear"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden border-y border-[var(--glass-border)]/80"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: glowOpacity }}
        >
          <div
            className="w-[70%] max-w-xl aspect-square rounded-full opacity-25"
            style={{
              background: "var(--color-accent)",
              filter: "blur(90px)",
            }}
          />
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <SectionTitle
          eyebrow="Ensino"
          title={codear.title}
          className="mb-10"
        />

        <motion.article
          className="rounded-xl glass-strong p-6 md:p-8 border border-[var(--color-accent)]/30 hover:border-[var(--color-accent)]/50 transition-colors duration-300"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-[var(--color-accent)]/15 text-[var(--color-accent)] border border-[var(--color-accent)]/30">
              <GraduationCap size={11} aria-hidden />
              {codear.tagline}
            </span>
            <a
              href={codear.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1.5 text-sm font-mono text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
            >
              Site
              <ExternalLink size={14} aria-hidden />
            </a>
          </div>

          <p className="text-xs font-mono text-[var(--color-muted)] mb-4">
            {codear.context}
          </p>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-6">
            {codear.description}
          </p>

          <div className="grid grid-cols-3 gap-3 mb-6 p-3 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)]">
            {codear.metrics.map((m) => (
              <div key={m.label} className="text-center">
                <p className="text-sm font-semibold font-mono text-[var(--color-accent)]">
                  {m.value}
                </p>
                <p className="text-[10px] text-[var(--color-muted)] mt-0.5 leading-tight">
                  {m.label}
                </p>
              </div>
            ))}
          </div>

          <ul className="flex flex-wrap gap-1.5">
            {codear.tags.map((tag) => (
              <li
                key={tag}
                className="px-2 py-0.5 text-xs font-mono rounded bg-[var(--color-accent)]/10 text-[var(--color-accent-muted)]"
              >
                {tag}
              </li>
            ))}
          </ul>
        </motion.article>
      </div>
    </section>
  )
}
