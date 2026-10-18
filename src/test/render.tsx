import { render } from '@testing-library/react'
import type { ReactElement } from 'react'
import { vi } from 'vitest'
import type { Lang } from '../i18n'
import { LangProvider } from '../LangProvider'

export function renderIn(ui: ReactElement, lang: Lang = 'en') {
  vi.spyOn(navigator, 'languages', 'get').mockReturnValue([lang])
  return render(<LangProvider>{ui}</LangProvider>)
}
