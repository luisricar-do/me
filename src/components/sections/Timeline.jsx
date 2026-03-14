import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { SectionTitle } from "../ui/SectionTitle"
import { timelineEntries } from "../../data/timeline"

const CATEGORY = {
  education: {
    color: "#f59e0b",
    textClass: "text-amber-300",
    borderClass: "border-amber-400/50",
    bgClass: "bg-amber-400/8",
    dotBg: "bg-amber-400",
    label: "Educação",
  },
  work: {
    color: "#22c55e",
    textClass: "text-[var(--color-accent)]",
    borderClass: "border-[var(--color-accent)]/50",
    bgClass: "bg-[var(--color-accent)]/8",
    dotBg: "bg-[var(--color-accent)]",
    label: "Trabalho",
  },
  community: {
    color: "#8b5cf6",
    textClass: "text-violet-400",
    borderClass: "border-violet-500/50",
    bgClass: "bg-violet-500/8",
    dotBg: "bg-violet-500",
    label: "Comunidade",
  },
  achievement: {
    color: "#06b6d4",
    textClass: "text-cyan-400",
    borderClass: "border-cyan-500/50",
    bgClass: "bg-cyan-500/8",
    dotBg: "bg-cyan-500",
    label: "Conquista",
  },
}

// Group entries by year preserving order
const grouped = timelineEntries.reduce((acc, entry) => {
  if (!acc[entry.year]) acc[entry.year] = []
  acc[entry.year].push(entry)
  return acc
}, {})

export function Timeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 0.4])

  return (
    <section
      id="trajetoria"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Glow de fundo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: glowOpacity }}
        >
          <div
            className="w-[80%] max-w-2xl aspect-square rounded-full opacity-30"
            style={{ background: "var(--color-accent)", filter: "blur(100px)" }}
          />
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <SectionTitle
          eyebrow="Trajetória"
          title="Linha do tempo"
          className="mb-16"
        />

        {/* Legenda de categorias */}
        <motion.div
          className="flex flex-wrap gap-3 mb-12"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {Object.entries(CATEGORY).map(([key, cat]) => (
            <span
              key={key}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono glass border border-[var(--glass-border)]"
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: cat.color }}
              />
              <span className="text-[var(--color-muted)]">{cat.label}</span>
            </span>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Linha vertical */}
          <div
            className="absolute left-[7px] top-2 bottom-2 w-px"
            style={{
              background:
                "linear-gradient(to bottom, var(--color-accent) 0%, rgba(34,197,94,0.3) 60%, transparent 100%)",
            }}
          />

          {Object.entries(grouped).map(([year, entries]) => (
            <YearGroup key={year} year={year} entries={entries} />
          ))}
        </div>
      </div>
    </section>
  )
}

function YearGroup({ year, entries }) {
  return (
    <div className="mb-2">
      {/* Marcador de ano */}
      <motion.div
        className="relative flex items-center gap-3 mb-5 pl-10"
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35 }}
      >
        {/* Losango do ano na linha */}
        <div
          className="absolute left-0 w-3.5 h-3.5 rotate-45 glass-strong border border-[var(--color-accent)]/60"
          style={{ background: "var(--color-accent)/10" }}
        />
        <span className="text-xs font-mono font-semibold text-[var(--color-accent)] tracking-widest">
          {year}
        </span>
        <div className="flex-1 h-px bg-[var(--color-accent)]/15" />
      </motion.div>

      {/* Entradas do ano */}
      {entries.map((entry, i) => (
        <TimelineEntry key={entry.id} entry={entry} delay={i * 0.08} />
      ))}
    </div>
  )
}

function TimelineEntry({ entry, delay }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.55"],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1])
  const x = useTransform(scrollYProgress, [0, 0.5], [-10, 0])

  const cat = CATEGORY[entry.category]
  const Icon = entry.icon

  return (
    <motion.div
      ref={ref}
      className="relative pl-10 mb-4"
      style={{ opacity, x }}
    >
      {/* Dot na linha */}
      <div className="absolute left-0 top-4 flex items-center justify-center">
        <div
          className={`w-3.5 h-3.5 rounded-full border-2 border-[var(--color-bg,#0a0a0a)] ${cat.dotBg}`}
          style={{ boxShadow: `0 0 8px ${cat.color}60` }}
        />
        {entry.current && (
          <motion.div
            className={`absolute w-3.5 h-3.5 rounded-full ${cat.dotBg} opacity-40`}
            animate={{ scale: [1, 2.2, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        className={`group rounded-lg glass border ${cat.borderClass} px-4 py-3 transition-colors duration-200`}
        whileHover={{
          y: -2,
          boxShadow: `0 4px 24px ${cat.color}18, 0 0 0 1px ${cat.color}20`,
        }}
        transition={{ duration: 0.15 }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5 min-w-0">
            <div
              className={`mt-0.5 shrink-0 p-1 rounded ${cat.bgClass}`}
            >
              <Icon size={12} className={cat.textClass} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-[var(--color-ink)] leading-snug">
                {entry.title}
                {entry.current && (
                  <span
                    className={`ml-2 inline-block px-1.5 py-0.5 text-[10px] font-mono rounded-full ${cat.bgClass} ${cat.textClass} border border-current/30`}
                  >
                    agora
                  </span>
                )}
              </p>
              <p className="text-xs text-[var(--color-muted)] mt-0.5">
                {entry.subtitle}
              </p>
            </div>
          </div>
          <span className="shrink-0 text-[11px] font-mono text-[var(--color-muted)] mt-0.5">
            {entry.date}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}
