import { Header } from './components/Header'
import { LangProvider } from './LangProvider'

export default function App() {
  return (
    <LangProvider>
      <Header />
      <main id="main" tabIndex={-1} />
    </LangProvider>
  )
}
