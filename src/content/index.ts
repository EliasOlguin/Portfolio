import type { Lang } from '../i18n'
import { en } from './en'
import type { Content } from './types'

export type { Content }

export const content: Record<Lang, Content> = { en, es: en, de: en }
