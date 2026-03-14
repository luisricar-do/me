import { Hero } from "../components/sections/Hero"
import { About } from "../components/sections/About"
import { Highlights } from "../components/sections/Highlights"
import { Timeline } from "../components/sections/Timeline"
import { Projects } from "../components/sections/Projects"
import { Contact } from "../components/sections/Contact"

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <Highlights />
      <Projects />
      <Timeline />
      <Contact />
    </>
  )
}
