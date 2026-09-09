import { Button } from "../components/ui/Button"
import { usePageMeta } from "../hooks/usePageMeta"

export function NotFound() {
  usePageMeta("Página não encontrada", "Esta página não existe.")

  return (
    <section className="mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-6 py-32">
      <p className="label text-accent">404</p>
      <h1 className="display mt-5 max-w-2xl text-balance text-[clamp(2.5rem,8vw,5rem)] text-ink">
        Essa página não existe.
      </h1>
      <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted">
        O caminho que você tentou não está aqui. Talvez o link esteja velho.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button to="/">Ir para o início</Button>
        <Button to="/ia" variant="outline">
          Régua de IA
        </Button>
      </div>
    </section>
  )
}
