import type { Record as PbRecord } from './pocketbase'

export interface Team extends PbRecord {
  name: string
  game: string
  hidden: boolean
  gameSpecificData: Record<string, string | number | boolean>
}

export interface Membership extends PbRecord {
  team: string
  user: string
  roleIcon: string
}

export interface Player extends PbRecord {
  id: string
  username: string
  email?: string
  name?: string
  avatar?: string
  created: string
  updated: string
  verified: boolean
}
