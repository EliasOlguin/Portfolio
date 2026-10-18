import { Header } from './components/Header'
import { LangProvider } from './LangProvider'
import { Hero } from './sections/Hero'

export default function App() {
  return (
    <LangProvider>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
      </main>
    </LangProvider>
  )
}
