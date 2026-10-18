import { describe, expect, test } from 'vitest'
import { detectLang } from './i18n'

describe('detectLang', () => {
  test('a saved valid choice wins over the browser', () => {
    expect(detectLang('de', ['es-AR'])).toBe('de')
  })
  test('an invalid saved value is ignored', () => {
    expect(detectLang('fr', ['es-AR'])).toBe('es')
  })
  test('uses the first supported browser language', () => {
    expect(detectLang(null, ['de-DE', 'en'])).toBe('de')
  })
  test('skips unsupported browser languages', () => {
    expect(detectLang(null, ['fr-FR', 'es-AR'])).toBe('es')
  })
  test('falls back to English when nothing matches', () => {
    expect(detectLang(null, ['pt-BR'])).toBe('en')
  })
  test('falls back to English with no browser languages', () => {
    expect(detectLang(null, [])).toBe('en')
  })
})
