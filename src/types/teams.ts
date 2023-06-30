import type { Record } from 'pocketbase'

export interface Team extends Record {
  name: string
  game: string
  hidden: boolean
}

export interface Membership extends Record {
  team: string
  user: string
  roleIcon: string
}

export interface Player extends Record {
  id: string
  username: string
  email?: string
  name?: string
  avatar?: string
  created: string
  updated: string
  verified: boolean
}
