import { Header } from './components/Header'
import { LangProvider } from './LangProvider'
import { Hero } from './sections/Hero'
import { Experience } from './sections/Experience'
import { Metrics } from './sections/Metrics'
import './sections/sections.css'

export default function App() {
  return (
    <LangProvider>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Metrics />
        <Experience />
      </main>
    </LangProvider>
  )
}
