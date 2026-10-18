import { useLang } from '../LangProvider'
import { LangSwitcher } from './LangSwitcher'
import './Header.css'

export function Header() {
  const { t } = useLang()
  return (
    <>
      <a className="skip" href="#main">
        {t.nav.skip}
      </a>
      <header className="header">
        <div className="wrap header__row">
          <a className="header__mark mono" href="#top">
            EO
          </a>
          <LangSwitcher />
        </div>
      </header>
    </>
  )
}
