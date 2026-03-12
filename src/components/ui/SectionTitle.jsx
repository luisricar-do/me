import { motion } from "framer-motion"

export function SectionTitle({ eyebrow, title, className = "" }) {
  return (
    <motion.div
      className={`max-w-2xl ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {eyebrow && (
        <p className="text-sm font-mono text-[var(--color-accent)] uppercase tracking-wider mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-semibold text-[var(--color-ink)]">
        {title}
      </h2>
    </motion.div>
  )
}
