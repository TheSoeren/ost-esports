import { Collection } from '~/types/pocketbase'
import pb from './pocketbase'
import type { RegisterForm } from '~/routes/public/register'
import type { User } from '~/types/user'
import type { ProfileForm } from '~/routes/guarded/profile'
import { deleteCookie, exportAuthStoreToCookie } from './cookie-service'

export const AUTH_COOKIE = 'pb_auth'

export async function login(usernameOrEmail: string, password: string) {
  const authRecord = await pb
    .collection(Collection.USERS)
    .authWithPassword<User>(usernameOrEmail, password)

  exportAuthStoreToCookie()
  return authRecord
}

export async function register(values: RegisterForm) {
  return pb.collection(Collection.USERS).create<User>(values)
}

export function logout() {
  deleteCookie(AUTH_COOKIE)
  pb.authStore.clear()
}

export async function getUsers() {
  return pb.collection(Collection.USERS).getFullList<User>()
}

export async function updateUser(userId: string, values: ProfileForm) {
  return pb.collection(Collection.USERS).update<User>(userId, values)
}
