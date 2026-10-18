import { useLang } from '../LangProvider'

export function Chips({ items }: { items: readonly string[] }) {
  const { t } = useLang()
  return (
    <ul className="chips" aria-label={t.nav.stack}>
      {items.map((item) => (
        <li key={item} className="chip">
          {item}
        </li>
      ))}
    </ul>
  )
}
