import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { SectionTitle } from "../ui/SectionTitle"
import { site } from "../../data/site"

const codeSnippet = `// stack.js
const stack = {
  frontend: ['React.js', 'TypeScript'],
  backend: ['Node.js', 'PostgreSQL', 'MongoDB', 'Redis'],
  cloud: ['AWS', 'Azure', 'Azure SignalR'],
  devops: ['CI/CD', 'Microservices', 'Observabilidade'],
  governance: ['DPO', 'LGPD']
};
export default stack;`

export function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const pathProgress = useTransform(scrollYProgress, [0.1, 0.5], [0, 1])
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 0.6])

  return (
    <section
      id="sobre"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden bg-[var(--color-paper)]"
    >
      {/* Grid de circuitos animado (fundo) */}
      <div className="absolute inset-0 pointer-events-none">
        <CircuitBackground pathProgress={pathProgress} glowOpacity={glowOpacity} />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionTitle
          eyebrow="Sobre"
          title="Um pouco sobre mim"
          className="mb-12"
        />
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            className="space-y-6 text-[var(--color-ink)]/85 leading-relaxed"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-4">
            <p>
              Atuo como <strong className="text-[var(--color-accent)]">Software Engineer</strong>,{" "}
              <strong className="text-[var(--color-accent)]">Cloud Architect</strong> e{" "}
              <strong className="text-[var(--color-accent)]">DevOps</strong>, com mais de 4 anos na{" "}
              <strong className="text-[var(--color-accent)]">Tech for Humans</strong>. Minha atuação une
              planejamento estratégico e execução técnica: arquitetura em nuvem, automação, CI/CD e
              observabilidade, além de <strong className="text-[var(--color-accent)]">Governança de Dados (DPO)</strong> e
              conformidade com a LGPD.
            </p>
            <p>
              Formado em Sistemas de Informação pela <strong className="text-[var(--color-accent)]">UNIFEI</strong>, com
              mestrado em andamento em Ciência e Tecnologia da Computação (IA). De estagiário a
              DevOps Manager, passei por desenvolvimento fullstack (Node.js, React, PostgreSQL, Redis,
              Azure SignalR), mentoria técnica e hoje lidero a visão de DevOps e SDLC na empresa.
            </p>
            </div>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative z-10 rounded-xl overflow-hidden border border-[var(--color-ink)]/10 bg-[var(--color-paper-elevated)]">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--color-ink)]/10 bg-[var(--color-paper)]/50">
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                <span className="text-xs font-mono text-[var(--color-muted)]">
                  stack.js
                </span>
              </div>
              <CodeBlock code={codeSnippet} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function CircuitBackground({ pathProgress, glowOpacity }) {
  const path1Offset = useTransform(pathProgress, [0, 1], [1200, 0])
  const path2Offset = useTransform(pathProgress, [0.2, 0.7], [800, 0])
  const circle2Opacity = useTransform(pathProgress, [0.3, 0.6], [0, 1])
  return (
    <svg
      className="absolute inset-0 w-full h-full text-[var(--color-accent)]"
      aria-hidden
    >
      <defs>
        <linearGradient id="circuit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--color-accent-muted)" stopOpacity="0.2" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Linhas tipo circuito que “desenham” no scroll */}
      <motion.path
        d="M 0 120 Q 200 80 400 120 T 800 120 T 1200 120"
        fill="none"
        stroke="url(#circuit-grad)"
        strokeWidth="1"
        strokeDasharray="1200"
        style={{ strokeDashoffset: path1Offset }}
        opacity={0.4}
      />
      <motion.path
        d="M 100 400 L 400 400 L 400 280 L 700 280 L 700 400 L 1100 400"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1"
        strokeDasharray="800"
        style={{ strokeDashoffset: path2Offset }}
        opacity={0.35}
      />
      <motion.circle
        cx="400"
        cy="120"
        r="4"
        fill="var(--color-accent)"
        style={{ opacity: pathProgress }}
      />
      <motion.circle
        cx="700"
        cy="280"
        r="4"
        fill="var(--color-accent-muted)"
        style={{ opacity: circle2Opacity }}
      />
      <motion.ellipse
        cx="50%"
        cy="50%"
        rx="40%"
        ry="30%"
        fill="var(--color-accent)"
        style={{ opacity: glowOpacity, filter: "blur(80px)" }}
      />
    </svg>
  )
}

function CodeBlock({ code }) {
  const lines = code.trim().split("\n")
  return (
    <pre className="p-4 text-xs md:text-sm font-mono overflow-x-auto">
      {lines.map((line, i) => (
        <motion.span
          key={i}
          className="block"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
        >
          <LineContent line={line} />
        </motion.span>
      ))}
    </pre>
  )
}

function LineContent({ line }) {
  const comment = line.trim().startsWith("//")
  const key = /^\s*(const|let|var|export|default)/.test(line)
  const string = /['"`]/.test(line)
  return (
    <span
      className={
        comment
          ? "text-[var(--color-muted)]"
          : key
            ? "text-[var(--color-accent-muted)]"
            : string
              ? "text-amber-400/90"
              : "text-[var(--color-ink)]/90"
      }
    >
      {line}
    </span>
  )
}
