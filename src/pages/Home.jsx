import { Hero } from "../components/sections/Hero"
import { Services } from "../components/sections/Services"
import { Talks } from "../components/sections/Talks"
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

// Tese → prova → o que ofereço → quem sou → como me chamar
export function Home() {
  usePageMeta(
    `${site.name} | Governança de TI e IA · Palestras`,
    "Luis Ricardo Santos, Gerente de Governança de TI e IA na Tech for Humans. Palestras e mentoria sobre IA na engenharia: onde ela acelera, onde não deve entrar e como governar."
  )

  return (
    <>
      <Hero />
      <Services />
      <Talks />
      <RulerTeaser />
      <PullQuote {...quotes.repertorio} />
      <About />
      <Highlights />
      <Timeline />
      <Contact />
      <BuiltWith />
    </>
  )
}
