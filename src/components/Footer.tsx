import mate from '../assets/mate.svg?raw'
import { useLang } from '../LangProvider'

const icon = mate.replace('<svg ', '<svg aria-hidden="true" focusable="false" ')

export function Footer() {
  const { t } = useLang()
  return (
    <footer className="footer mono">
      <div className="wrap footer__row">
        <span>54.80°S 68.30°W → 50.94°N 6.96°E</span>
        <span className="footer__mate">
          <span>{t.footer.built}</span>
          <span dangerouslySetInnerHTML={{ __html: icon }} />
        </span>
      </div>
    </footer>
  )
}
