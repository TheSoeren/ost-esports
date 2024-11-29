import { Collection } from '~/types/pocketbase'
import pb from './pocketbase'
import type { RegisterForm } from '~/routes/public/register'
import type { User } from '~/types/user'
import type { ProfileForm } from '~/routes/guarded/profile'

export async function login(usernameOrEmail: string, password: string) {
  return pb
    .collection(Collection.USERS)
    .authWithPassword(usernameOrEmail, password)
}

export async function register(values: RegisterForm) {
  return pb.collection(Collection.USERS).create(values)
}

export async function getUsers() {
  return pb.collection(Collection.USERS).getFullList<User>()
}

export async function updateUser(userId: string, values: ProfileForm) {
  return pb.collection(Collection.USERS).update<User>(userId, values)
}
