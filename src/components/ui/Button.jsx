import { Link } from "react-router-dom"

const variants = {
  primary:
    "bg-ink text-paper border-ink hover:bg-accent hover:border-accent hover:text-accent-ink",
  outline: "border-line text-ink hover:border-accent hover:text-accent bg-transparent",
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-full border px-6 py-2.5 text-sm font-medium transition duration-300 hover:-translate-y-0.5 active:translate-y-0"

export function Button({
  children,
  variant = "primary",
  href,
  to,
  className = "",
  ...props
}) {
  const classes = `${base} ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
