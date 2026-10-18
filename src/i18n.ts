export type Lang = 'en' | 'es' | 'de'

export const LANGS: readonly Lang[] = ['en', 'es', 'de']
export const STORAGE_KEY = 'lang'

const isLang = (value: string): value is Lang => (LANGS as readonly string[]).includes(value)

export function detectLang(saved: string | null, browser: readonly string[]): Lang {
  if (saved && isLang(saved)) return saved
  for (const tag of browser) {
    const primary = tag.toLowerCase().split('-')[0]
    if (isLang(primary)) return primary
  }
  return 'en'
}
