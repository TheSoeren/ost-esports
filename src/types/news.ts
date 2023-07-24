import type { Record } from './pocketbase'

export interface NewsEntry extends Record {
  title: string
  teaser: string
  content: string
  hidden: boolean
  publishDate: string
  author: string
}
