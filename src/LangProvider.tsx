import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { content, type Content } from './content'
import { detectLang, STORAGE_KEY, type Lang } from './i18n'

type LangContext = { lang: Lang; setLang: (lang: Lang) => void; t: Content }

const Ctx = createContext<LangContext | null>(null)

// Storage can throw (private mode, blocked site data); the site must still work without it.
function readSaved(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function save(lang: Lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    // the choice lasts for this visit only
  }
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setState] = useState<Lang>(() => detectLang(readSaved(), navigator.languages ?? []))

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (next: Lang) => {
    setState(next)
    save(next)
  }

  return <Ctx.Provider value={{ lang, setLang, t: content[lang] }}>{children}</Ctx.Provider>
}

export function useLang(): LangContext {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}
