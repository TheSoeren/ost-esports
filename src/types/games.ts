import type { Record } from 'pocketbase'

export interface Game extends Record {
  image: string
  name: string
  hidden: boolean
}
