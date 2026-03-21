import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ExternalLink, Youtube } from "lucide-react"
import { SectionTitle } from "../ui/SectionTitle"
import { highlights } from "../../data/highlights"

const badgeStyles = {
  amber: {
    pill: "bg-amber-400/15 text-amber-300 border border-amber-400/30",
    border: "border-amber-400/40",
    hoverBorder: "hover:border-amber-400/70",
    metric: "text-amber-300",
    glow: "rgba(251,191,36,0.12)",
  },
  green: {
    pill: "bg-[var(--color-accent)]/15 text-[var(--color-accent)] border border-[var(--color-accent)]/30",
    border: "border-[var(--color-accent)]/40",
    hoverBorder: "hover:border-[var(--color-accent)]/70",
    metric: "text-[var(--color-accent)]",
    glow: "rgba(34,197,94,0.12)",
  },
}

export function Highlights() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 0.5])

  return (
    <section
      id="destaques"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: glowOpacity }}
        >
          <div
            className="w-[80%] max-w-2xl aspect-square rounded-full opacity-30"
            style={{
              background: "var(--color-accent)",
              filter: "blur(100px)",
            }}
          />
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <SectionTitle
          eyebrow="Destaques"
          title="Projetos de impacto"
          className="mb-16"
        />

        <div className="grid md:grid-cols-2 gap-6">
          {highlights.map((item, i) => (
            <HighlightCard key={item.id} item={item} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  )
}

function HighlightCard({ item, delay }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.5"],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.4], [20, 0])

  const style = badgeStyles[item.badgeColor]
  const Icon = item.badgeIcon

  return (
    <motion.div ref={ref} style={{ opacity, y }}>
      <motion.div
        className={`group rounded-xl glass-strong p-6 border ${style.border} ${style.hoverBorder} transition-colors duration-300 h-full flex flex-col`}
        whileHover={{
          y: -4,
          boxShadow: `0 8px 40px ${style.glow}, 0 0 0 1px ${style.glow}`,
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Badge + external link */}
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium ${style.pill}`}>
            <Icon size={11} />
            {item.badge}
          </span>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
            aria-label={`Abrir ${item.title} em nova aba`}
          >
            <ExternalLink size={15} />
          </a>
        </div>

        {/* Title + context */}
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group/title"
        >
          <h3 className="text-xl font-semibold text-[var(--color-ink)] group-hover/title:text-[var(--color-accent)] transition-colors mb-1">
            {item.title}
          </h3>
        </a>
        <p className="text-xs font-mono text-[var(--color-muted)] mb-4">
          {item.context}
        </p>

        {/* Description */}
        <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-5">
          {item.description}
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3 mb-5 p-3 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)]">
          {item.metrics.map((m) => (
            <div key={m.label} className="text-center">
              <p className={`text-sm font-semibold font-mono ${style.metric}`}>
                {m.value}
              </p>
              <p className="text-[10px] text-[var(--color-muted)] mt-0.5 leading-tight">
                {m.label}
              </p>
            </div>
          ))}
        </div>

        {/* Tags */}
        <ul className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <li
              key={tag}
              className="px-2 py-0.5 text-xs font-mono rounded bg-[var(--color-accent)]/10 text-[var(--color-accent-muted)]"
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* Video link */}
        {item.videoHref && (
          <a
            href={item.videoHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-xs font-mono text-[var(--color-muted)] hover:text-[#ff4444] transition-colors"
          >
            <Youtube size={14} />
            Ver apresentação
          </a>
        )}
      </motion.div>
    </motion.div>
  )
}
