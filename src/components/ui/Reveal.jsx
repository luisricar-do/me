import { useInView } from "../../hooks/useInView"

/**
 * Entrada padrão das seções. Toda a animação está no CSS ([data-reveal]);
 * aqui só ligamos o atributo quando o elemento entra no viewport.
 */
export function Reveal({ as: Tag = "div", children, delay = 0, className = "", ...props }) {
  const [ref, inView] = useInView()

  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-visible={inView ? "" : undefined}
      style={delay ? { "--reveal-delay": `${delay}s` } : undefined}
      className={className}
      {...props}
    >
      {children}
    </Tag>
  )
}
