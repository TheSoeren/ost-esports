import { Collection } from '~/types/pocketbase'
import type { RegisterForm } from '~/routes/public/register'
import type { User } from '~/types/user'
import type { Cookie } from '@builder.io/qwik-city'
import clientPb from '~/data/pocketbase'

export const AUTH_COOKIE = 'pb_auth'

export async function login(usernameOrEmail: string, password: string) {
  const authRecord = await clientPb
    .collection(Collection.USERS)
    .authWithPassword<User>(usernameOrEmail, password)

  exportAuthStoreToCookie()
  clientPb.authStore.save(authRecord.token || '', authRecord.record || null)

  return authRecord
}

export async function register(values: RegisterForm) {
  return clientPb.collection(Collection.USERS).create<User>(values)
}

export function logout() {
  deleteCookie()
  clientPb.authStore.clear()
}

export function exportAuthStoreToCookie() {
  document.cookie = clientPb.authStore.exportToCookie({ httpOnly: false })
}

// Drop-in replacement for pocketbase.authStore.loadFromCookie, since it does not seem to be working
export function loadAuthStoreFromCookie(cookies: Cookie, pb = clientPb) {
  const authCookie = cookies.get(AUTH_COOKIE)
  if (!authCookie || !authCookie.value) {
    pb.authStore.clear()
    return
  }

  const parsedCookie = JSON.parse(authCookie.value)
  /*
   * Copied this line from pocketbase source code because loadFromCookie did not work properly
   * https://github.com/pocketbase/js-sdk/blob/848b77d467b093c6bfbb19799e54af3b7909222e/src/stores/BaseAuthStore.ts#L140
   */
  pb.authStore.save(
    parsedCookie.token || '',
    parsedCookie.record || parsedCookie.model || null
  )
}

export function cookieExists(name: string): boolean {
  return document.cookie
    .split(';')
    .some((item) => item.trim().indexOf(name + '=') == 0)
}

export function deleteCookie() {
  if (cookieExists(AUTH_COOKIE)) {
    document.cookie = `${AUTH_COOKIE}=; expires=-1; path=/;`
  }
}
