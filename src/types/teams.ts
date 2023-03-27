import type { Record } from './pocketbase'

export interface Team extends Record {
  name: string
  game: string
  hidden: boolean
}

export interface Player extends Record {
  team: string
  user: string
  roleIcon: string
}
