import type { Record } from './pocketbase'

export interface NewsEntry extends Record {
  title: string
  content?: string
  hidden: boolean
  displayBy?: string
}
