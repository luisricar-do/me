import { Hero } from "../components/sections/Hero"
import { Services } from "../components/sections/Services"
import { Talks } from "../components/sections/Talks"
import { Writing } from "../components/sections/Writing"
import { About } from "../components/sections/About"
import { Highlights } from "../components/sections/Highlights"
import { Timeline } from "../components/sections/Timeline"
import { Contact } from "../components/sections/Contact"
import { BuiltWith } from "../components/sections/BuiltWith"
import { PullQuote } from "../components/ui/PullQuote"
import { RulerTeaser } from "../components/ia/RulerTeaser"
import { quotes } from "../data/quotes"
import { usePageMeta } from "../hooks/usePageMeta"
import { site } from "../data/site"

// O que faço → onde escrevo → a ferramenta → quem sou → provas → palcos, como extra
export function Home() {
  usePageMeta(
    `${site.name} | IA aplicada à engenharia`,
    "Luis Ricardo Santos, Gerente de Governança de TI e IA na Tech for Humans. Uso IA para fazer engenharia funcionar melhor: onde ela acelera, onde não deve entrar e como governar. Escrevo no Substack."
  )

  return (
    <>
      <Hero />
      <Services />
      <Writing />
      <RulerTeaser />
      <About />
      <Highlights />
      <PullQuote {...quotes.repertorio} />
      <Talks />
      <Timeline />
      <Contact />
      <BuiltWith />
    </>
  )
}
