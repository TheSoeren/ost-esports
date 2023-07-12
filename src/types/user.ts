import type { Record } from './pocketbase'

const userRoles = ['editor', 'captain'] as const
export type UserRole = (typeof userRoles)[number]

export interface User extends Record {
  id: string
  username: string
  email?: string
  name?: string
  avatar?: string
  roles: UserRole[]
  created: string
  updated: string
  verified: boolean
}
