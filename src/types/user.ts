import type { Record } from './pocketbase'

type userRoles = ['editor', 'captain']
export type UserRole = userRoles[number]

export interface User extends Record {
  id: string
  username: string
  email?: string
  gamertag?: string
  roles: UserRole[]
  created: string
  updated: string
  verified: boolean
}
