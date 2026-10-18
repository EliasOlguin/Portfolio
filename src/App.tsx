import { Header } from './components/Header'
import { RouteLine } from './components/RouteLine'
import { LangProvider } from './LangProvider'
import { Hero } from './sections/Hero'
import { Experience } from './sections/Experience'
import { Metrics } from './sections/Metrics'
import { Projects } from './sections/Projects'
import { Path } from './sections/Path'
import { Education } from './sections/Education'
import { Contact } from './sections/Contact'
import { Footer } from './components/Footer'
import './sections/sections.css'

export default function App() {
  return (
    <LangProvider>
      <Header />
      <RouteLine />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Metrics />
        <Experience />
        <Projects />
        <Path />
        <Education />
        <Contact />
      </main>
      <Footer />
    </LangProvider>
  )
}
