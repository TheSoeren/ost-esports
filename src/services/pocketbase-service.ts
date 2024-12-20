import PocketBase from 'pocketbase'
import type { Cookie } from '@builder.io/qwik-city'
import { loadAuthStoreFromCookie } from './auth-service'

export function getEdgePbInstance(cookie?: Cookie) {
  const pb = new PocketBase(import.meta.env.VITE_API_URL)

  if (cookie) {
    loadAuthStoreFromCookie(cookie, pb)
  }

  return pb
}
