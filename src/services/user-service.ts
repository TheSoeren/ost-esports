import { Collection } from '~/types/pocketbase'
import type { User } from '~/types/user'
import type { ProfileForm } from '~/routes/guarded/profile'
import pb from '~/data/pocketbase'

export const AUTH_COOKIE = 'pb_auth'

export async function getUsers() {
  return pb.collection(Collection.USERS).getFullList<User>()
}

export async function updateUser(userId: string, values: ProfileForm) {
  return pb.collection(Collection.USERS).update<User>(userId, values)
}
