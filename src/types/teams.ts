import type { Record } from './pocketbase'

export interface Team extends Record {
  name: string
  game: any
}
