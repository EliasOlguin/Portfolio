import type { Lang } from '../i18n'
import { de } from './de'
import { en } from './en'
import { es } from './es'
import type { Content } from './types'

export type { Content }

export const content: Record<Lang, Content> = { en, es, de }
