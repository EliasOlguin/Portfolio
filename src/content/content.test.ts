import { describe, expect, test } from 'vitest'
import { LANGS } from '../i18n'
import { PHONE_RE } from '../test/phone'
import { content } from '.'

const { en } = content

describe.each(LANGS.filter((l) => l !== 'en'))('%s content', (lang) => {
  const t = content[lang]

  test('is translated, not an alias of English', () => {
    expect(t).not.toBe(en)
    expect(t.hero.headline).not.toBe(en.hero.headline)
  })

  test('has the same list lengths as English', () => {
    expect(t.metrics.items).toHaveLength(en.metrics.items.length)
    expect(t.experience.items).toHaveLength(en.experience.items.length)
    expect(t.path.stations).toHaveLength(en.path.stations.length)
    expect(t.education.items).toHaveLength(en.education.items.length)
    expect(t.languages.items).toHaveLength(en.languages.items.length)
    expect(t.projects.doneToday.highlights).toHaveLength(en.projects.doneToday.highlights.length)
    expect(t.projects.recycleApp.highlights).toHaveLength(en.projects.recycleApp.highlights.length)
  })
})

test('no phone number in any language', () => {
  expect(JSON.stringify(content)).not.toMatch(PHONE_RE)
})
