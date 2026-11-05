import { Hero } from "../components/sections/Hero"
import { Projects } from "../components/sections/Projects"
import { Services } from "../components/sections/Services"
import { Talks } from "../components/sections/Talks"
import { About } from "../components/sections/About"
import { Highlights } from "../components/sections/Highlights"
import { Writing } from "../components/sections/Writing"
import { Timeline } from "../components/sections/Timeline"
import { Contact } from "../components/sections/Contact"
import { BuiltWith } from "../components/sections/BuiltWith"
import { PullQuote } from "../components/ui/PullQuote"
import { RulerTeaser } from "../components/ia/RulerTeaser"
import { quotes } from "../data/quotes"
import { usePageMeta } from "../hooks/usePageMeta"
import { site } from "../data/site"

// O que construí → o que ofereço → prova → quem sou → como me chamar
export function Home() {
  usePageMeta(
    `${site.name} | Desenvolvimento, cloud e IA aplicada`,
    "Luis Ricardo Santos desenvolve sites e sistemas, do front à nuvem, e ajuda empresas a usar IA com critério. Também faz palestras, mentoria e escreve no Substack."
  )

  return (
    <>
      <Hero />
      <Projects />
      <Services />
      <Talks />
      <RulerTeaser />
      <PullQuote {...quotes.repertorio} />
      <About />
      <Highlights />
      <Writing />
      <Timeline />
      <Contact />
      <BuiltWith />
    </>
  )
}
