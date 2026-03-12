import { Header } from "./components/layout/Header"
import { Footer } from "./components/layout/Footer"
import { Home } from "./pages/Home"

function App() {
  return (
    <>
      <Header />
      <main>
        <Home />
      </main>
      <Footer />
    </>
  )
}

export default App
