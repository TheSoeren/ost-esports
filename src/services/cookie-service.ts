import type { Cookie } from '@builder.io/qwik-city'
import pb from './pocketbase'
import { AUTH_COOKIE } from './user-service'

type CookieProps = {
  name: string
  value: string
  maxAge?: number
  expires?: Date
  path?: string
  domain?: string
  secure?: boolean
  sameSite?: 'lax' | 'strict' | 'none'
}
const expireTime = 'Thu, 01 Jan 1970 00:00:00 GMT'

export function exportAuthStoreToCookie() {
  document.cookie = pb.authStore.exportToCookie({ httpOnly: false })
}

// Drop-in replacement for pocketbase.authStore.loadFromCookie, since it does not seem to be working
export function loadAuthStoreFromCookie(cookies: Cookie) {
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

export function asCookie(name: string, value: string) {
  return encodeURIComponent(name) + '=' + encodeURIComponent(value)
}

export function getCookieValue(name: string): string | undefined {
  return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop()
}

export function setCookie({
  name,
  value,
  maxAge,
  expires,
  path,
  domain,
  secure,
  sameSite,
}: CookieProps): void {
  let cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value)

  if (expires instanceof Date) {
    cookieText += '; expires=' + expires.toUTCString()
  }
  if (maxAge) {
    cookieText += '; max-age=' + maxAge
  }
  if (path) {
    cookieText += '; path=' + path
  }
  if (domain) {
    cookieText += '; domain=' + domain
  }
  if (secure) {
    cookieText += '; secure'
  }
  if (sameSite) {
    cookieText += '; samesite' + sameSite
  }

  document.cookie = cookieText
}

export function cookieHasValue(name: string, value: string): boolean {
  return document.cookie
    .split(';')
    .some((item) => item.trim().indexOf(name + '=' + value.trim()) == 0)
}

export function cookieExists(name: string): boolean {
  return document.cookie
    .split(';')
    .some((item) => item.trim().indexOf(name + '=') == 0)
}

export function deleteCookie(name: string, path = '/') {
  if (cookieExists(name)) {
    document.cookie = `${name}=; expires=${expireTime}; path=${path};`
  }
}

export function deleteAllCookies(): void {
  const cookies = document.cookie.split(';')

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i]
    const eqPos = cookie.indexOf('=')
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
    document.cookie = name + '=; expires=' + expireTime
  }
}
