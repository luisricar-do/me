import { motion } from "framer-motion"

const variants = {
  primary:
    "bg-[var(--color-accent)] text-[var(--color-paper)] hover:bg-[var(--color-accent-muted)] border-transparent",
  outline:
    "bg-transparent border-2 border-[var(--color-ink)] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]",
}

export function Button({
  children,
  variant = "primary",
  href,
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors border"

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${base} ${variants[variant]} ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type="button"
      className={`${base} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}
