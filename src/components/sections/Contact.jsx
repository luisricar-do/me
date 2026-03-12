import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Mail, Github, Linkedin, MessageCircle } from "lucide-react"
import { SectionTitle } from "../ui/SectionTitle"
import { site } from "../../data/site"

const links = [
  { href: `mailto:${site.email}`, icon: Mail, label: "Email", text: site.email },
  { href: `https://wa.me/${site.whatsapp}`, icon: MessageCircle, label: "WhatsApp", text: "(35) 8875-1001" },
  { href: site.github, icon: Github, label: "GitHub", text: "github.com" },
  { href: site.linkedin, icon: Linkedin, label: "LinkedIn", text: "linkedin.com" },
]

const TYPING_TEXT = "Enviar mensagem..."

export function Contact() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Transição de fundo: do tom do site (paper) para contact-bg (azul escuro)
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7],
    [
      "rgb(13, 13, 15)",   // --color-paper
      "rgb(18, 20, 28)",   // intermediário
      "rgb(10, 22, 40)",   // --color-contact-bg
    ]
  )
  const accentBlend = useTransform(scrollYProgress, [0.3, 0.8], [0, 1])

  return (
    <motion.section
      id="contato"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden min-h-[80vh]"
      style={{ backgroundColor }}
    >
      {/* Nós de rede animados (fundo) */}
      <NetworkNodes accentBlend={accentBlend} />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionTitle
          eyebrow="Contato"
          title="Vamos conversar?"
          className="mb-16"
        />
        <motion.div
          className="max-w-xl space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[var(--color-muted)]">
            Estou aberto a novas oportunidades, projetos e conversas. Envie um
            email ou acesse os links abaixo.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            {links.map(({ href, icon: Icon, label, text }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="inline-flex items-center gap-3 px-4 py-3 rounded-lg border border-[var(--color-ink)]/10 hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/5 transition-all group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon
                  size={20}
                  className="text-[var(--color-accent)] group-hover:scale-110 transition-transform"
                />
                <span className="text-sm font-medium text-[var(--color-ink)]">
                  {text}
                </span>
              </motion.a>
            ))}
          </div>
          <div className="mt-6">
            <TypingIndicator text={TYPING_TEXT} />
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

/** Pequenos nós conectados estilo rede (IT) */
function NetworkNodes({ accentBlend }) {
  const positions = [
    [10, 20], [88, 15], [50, 40], [25, 70], [75, 65], [15, 85], [90, 90],
  ]
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {positions.map(([left, top], i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-[var(--color-accent)]"
          style={{
            left: `${left}%`,
            top: `${top}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05, duration: 0.4 }}
        />
      ))}
      {/* Linhas entre nós */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <motion.line
          x1="10%"
          y1="20%"
          x2="50%"
          y2="40%"
          stroke="var(--color-accent)"
          strokeWidth="0.5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
        <motion.line
          x1="50%"
          y1="40%"
          x2="88%"
          y2="15%"
          stroke="var(--color-accent)"
          strokeWidth="0.5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        />
        <motion.line
          x1="25%"
          y1="70%"
          x2="75%"
          y2="65%"
          stroke="var(--color-contact-accent)"
          strokeWidth="0.5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </svg>
    </div>
  )
}

/** Texto digitando estilo terminal */
function TypingIndicator({ text }) {
  const [visible, setVisible] = useState(0)
  useEffect(() => {
    if (visible >= text.length) return
    const t = setTimeout(() => setVisible((v) => v + 1), 80)
    return () => clearTimeout(t)
  }, [visible, text.length])
  return (
    <span className="text-xs font-mono text-[var(--color-muted)]">
      <span className="text-[var(--color-accent)]">&gt;</span>{" "}
      {text.slice(0, visible)}
      <span className="terminal-cursor inline-block w-2 h-3 bg-[var(--color-accent)] ml-0.5 align-middle" />
    </span>
  )
}

