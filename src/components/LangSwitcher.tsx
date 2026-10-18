import { LANGS, type Lang } from '../i18n'
import { useLang } from '../LangProvider'
import './LangSwitcher.css'

const NAMES: Record<Lang, string> = { en: 'English', es: 'Español', de: 'Deutsch' }

export function LangSwitcher() {
  const { lang, setLang, t } = useLang()
  return (
    <div className="lang mono" role="group" aria-label={t.nav.language}>
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-label={NAMES[code]}
          aria-pressed={code === lang}
          onClick={() => setLang(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
