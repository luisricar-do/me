import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { site } from "../../data/site"
import { Button } from "../ui/Button"

const COMMAND = "cat ~/me.txt"
const PROMPT = "$ "

export function Hero() {
  const ref = useRef(null)
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  // Animação concentrada nos primeiros ~25% do scroll; depois tudo fica fixo em 1
  const commandChars = useTransform(scrollYProgress, [0, 0.1], [0, COMMAND.length])
  const outputOpacity = useTransform(scrollYProgress, [0.08, 0.15], [0, 1])
  const nameOpacity = useTransform(scrollYProgress, [0.12, 0.18], [0, 1])
  const taglineOpacity = useTransform(scrollYProgress, [0.16, 0.22], [0, 1])
  const ctaOpacity = useTransform(scrollYProgress, [0.2, 0.26], [0, 1])

  // Terminal levemente “travado” ao cursor
  useEffect(() => {
    const onMove = (e) => {
      setMouse({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  const terminalX = (mouse.x - 0.5) * 24
  const terminalY = (mouse.y - 0.5) * 16

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[300vh] flex items-start justify-center pt-32 pb-20"
    >
      <div className="sticky top-24 left-0 right-0 flex justify-center items-center min-h-[calc(100vh-6rem)] px-4">
        <motion.div
          className="relative w-full max-w-2xl"
          style={{
            x: terminalX,
            y: terminalY,
          }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          {/* Janela do terminal */}
          <div className="rounded-xl overflow-hidden border border-[var(--color-ink)]/10 bg-[var(--color-paper-elevated)] shadow-2xl shadow-black/40">
            {/* Barra de título */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-paper)]/80 border-b border-[var(--color-ink)]/10">
              <span className="w-3 h-3 rounded-full bg-[#ef4444]/80" />
              <span className="w-3 h-3 rounded-full bg-[#eab308]/80" />
              <span className="w-3 h-3 rounded-full bg-[#22c55e]/80" />
              <span className="flex-1 text-center text-xs font-mono text-[var(--color-muted)]">
                terminal — zsh
              </span>
            </div>
            {/* Corpo do terminal */}
            <div className="p-5 font-mono text-sm min-h-[280px] md:min-h-[320px]">
              <div className="flex flex-wrap items-center gap-0.5">
                <span className="text-[var(--color-accent)]">{PROMPT}</span>
                <TerminalTyping count={commandChars} text={COMMAND} />
                <span className="terminal-cursor inline-block w-2 h-4 bg-[var(--color-accent)] ml-0.5 align-middle" />
              </div>
              <motion.div
                style={{ opacity: outputOpacity }}
                className="mt-4 space-y-1 text-[var(--color-muted)]"
              >
                <p className="text-[var(--color-ink)]/80"># about me</p>
                <motion.p
                  style={{ opacity: nameOpacity }}
                  className="text-xl md:text-2xl font-semibold text-[var(--color-ink)]"
                >
                  {site.name}
                </motion.p>
                <motion.p
                  style={{ opacity: taglineOpacity }}
                  className="text-[var(--color-accent-muted)]"
                >
                  {site.tagline}
                </motion.p>
                <motion.p
                  style={{ opacity: taglineOpacity }}
                  className="text-[var(--color-muted)] pt-1"
                >
                  DevOps Manager & DPO na Tech for Humans. Arquitetura em nuvem,
                  CI/CD e governança de dados (LGPD).
                </motion.p>
              </motion.div>
              <motion.div
                style={{ opacity: ctaOpacity }}
                className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-[var(--color-ink)]/10"
              >
                <Button href="#projetos">Ver projetos</Button>
                <Button href="#contato" variant="outline">
                  Contato
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#sobre"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        aria-label="Rolar para Sobre"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="inline-block"
        >
          <ArrowDown size={28} />
        </motion.span>
      </motion.a>
    </section>
  )
}

/** Mostra os primeiros N caracteres do texto (N vem de useTransform) */
function TerminalTyping({ count, text }) {
  const [chars, setChars] = useState(0)
  useMotionValueEvent(count, "change", (v) => setChars(Math.round(v)))
  return <span>{text.slice(0, chars)}</span>
}
