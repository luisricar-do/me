import { ArrowUpRight } from "lucide-react"
import { Hero } from "../components/sections/Hero"
import { About } from "../components/sections/About"
import { Highlights } from "../components/sections/Highlights"
import { Talks } from "../components/sections/Talks"
import { Projects } from "../components/sections/Projects"
import { Timeline } from "../components/sections/Timeline"
import { Contact } from "../components/sections/Contact"
import { PullQuote } from "../components/ui/PullQuote"
import { Button } from "../components/ui/Button"
import { quotes } from "../data/quotes"
import { usePageMeta } from "../hooks/usePageMeta"
import { site } from "../data/site"

export function Home() {
  usePageMeta(
    `${site.name} | Software Engineer · Cloud Architect · DevOps`,
    "Portfólio de Luis Ricardo Santos. Gerente de Governança de TI e IA na Tech for Humans: arquitetura em nuvem, CI/CD, observabilidade e governança de dados."
  )

  return (
    <>
      <Hero />
      <About />
      <PullQuote {...quotes.repertorio} />
      <Highlights />
      <Talks />
      <PullQuote {...quotes.aiFirst}>
        <Button to="/ia" className="mt-8">
          Rodar a régua de autonomia
          <ArrowUpRight size={16} />
        </Button>
      </PullQuote>
      <Projects />
      <Timeline />
      <Contact />
    </>
  )
}
