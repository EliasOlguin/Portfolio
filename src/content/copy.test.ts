import { expect, test } from 'vitest'
import { content } from '.'

test('no filler adjectives where the facts already explain the benefit', () => {
  expect(JSON.stringify(content)).not.toMatch(/rigorous|riguros|konsequent/i)
})

test('the since-2024 text names the projects instead of pointing at their position', () => {
  expect(content.en.path.story).toMatch(/including DoneToday and recycle-app/)
  expect(content.es.path.story).toMatch(/incluidos DoneToday y recycle-app/)
  expect(content.de.path.story).toMatch(/darunter DoneToday und recycle-app/)
  expect(JSON.stringify(content)).not.toMatch(/two above|dos de arriba|beiden oben/)
})

test('German describes the citizenship as a recognition procedure', () => {
  expect(content.de.path.story).toMatch(
    /das Verfahren zur Anerkennung meiner italienischen Staatsbürgerschaft abgeschlossen/,
  )
})
