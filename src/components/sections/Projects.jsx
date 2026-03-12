import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { SectionTitle } from "../ui/SectionTitle"
import { projects } from "../../data/projects"

const PROMPT = "$ "

export function Projects() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 0.5])

  return (
    <section
      id="projetos"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Glow verde de fundo (igual About/Contact) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: glowOpacity }}
        >
          <div
            className="w-[80%] max-w-2xl aspect-square rounded-full opacity-40"
            style={{
              background: "var(--color-accent)",
              filter: "blur(80px)",
            }}
          />
        </motion.div>
      </div>
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <SectionTitle
          eyebrow="Projetos"
          title="Trabalhos recentes"
          className="mb-16"
        />

        {/* Bloco único estilo terminal: “viagem” por comandos */}
        <div className="rounded-xl overflow-hidden glass-strong shadow-xl">
          <div className="flex items-center gap-2 px-4 py-2.5 glass border-b border-[var(--glass-border)]">
            <span className="w-3 h-3 rounded-full bg-[#ef4444]/80" />
            <span className="w-3 h-3 rounded-full bg-[#eab308]/80" />
            <span className="w-3 h-3 rounded-full bg-[#22c55e]/80" />
            <span className="flex-1 text-center text-xs font-mono text-[var(--color-muted)]">
              portfolio — cd ~/trabalhos
            </span>
          </div>
          <div className="p-5 font-mono text-sm min-h-[400px]">
            <TerminalLine
              command={`cd ~/trabalhos && ls -la`}
              output="total 3"
              delay={0}
            />
            <TerminalLine
              command="ls"
              output={projects.map((p) => p.title).join("  ")}
              delay={0.1}
            />
            {projects.map((project) => (
              <ProjectTimelineEntry key={project.id} project={project} />
            ))}
            <motion.p
              className="mt-4 text-[var(--color-muted)]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-[var(--color-accent)]">{PROMPT}</span>
              <span className="terminal-cursor inline-block w-2 h-4 bg-[var(--color-accent)] ml-1 align-middle" />
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}

function TerminalLine({ command, output, delay = 0 }) {
  return (
    <motion.div
      className="mb-2"
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.3 }}
    >
      <p className="text-[var(--color-accent)]">
        {PROMPT}
        <span className="text-[var(--color-ink)]">{command}</span>
      </p>
      {output && (
        <p className="text-[var(--color-muted)] pl-2 border-l-2 border-[var(--color-ink)]/20 ml-1 mt-1">
          {output}
        </p>
      )}
    </motion.div>
  )
}

function ProjectTimelineEntry({ project }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.5"],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.3], [12, 0])

  const command = `cat ${project.title.toLowerCase().replace(/\s+/g, "-")}.md`
  return (
    <motion.div
      ref={ref}
      className="mb-6"
      style={{ opacity, y }}
    >
      <motion.p
        className="text-[var(--color-accent)]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        {PROMPT}
        <span className="text-[var(--color-ink)]">{command}</span>
      </motion.p>
        <motion.div
        className="mt-2 pl-2 border-l-2 border-[var(--color-accent)]/40 rounded-xl glass-terminal p-4 transition-colors duration-200 hover:border-[var(--color-accent)]/25 hover:shadow-[0_0_0_1px_rgba(34,197,94,0.15),0_8px_32px_rgba(0,0,0,0.2)]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        whileHover={{ y: -2 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.2 }}
      >
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors">
              {project.title}
            </h3>
            <ExternalLink
              size={16}
              className="text-[var(--color-muted)] group-hover:text-[var(--color-accent)] shrink-0 mt-0.5"
            />
          </div>
          <p className="text-xs text-[var(--color-muted)] mt-1">
            {project.dateFormatted()}
          </p>
          <p className="text-sm text-[var(--color-muted)] mt-2 line-clamp-2">
            {project.description}
          </p>
          <ul className="flex flex-wrap gap-1.5 mt-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="px-2 py-0.5 text-xs font-mono rounded bg-[var(--color-accent)]/10 text-[var(--color-accent-muted)]"
              >
                {tag}
              </li>
            ))}
          </ul>
        </a>
      </motion.div>
    </motion.div>
  )
}
