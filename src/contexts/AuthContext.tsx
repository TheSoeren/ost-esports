import type { QRL, Signal } from '@builder.io/qwik'
import {
  $,
  Slot,
  component$,
  createContextId,
  noSerialize,
  useContextProvider,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik'
import Pocketbase, {
  ClientResponseError,
  type RecordAuthResponse,
} from 'pocketbase'
import type { Record, UserRole, User } from '~/types'

// We know user is always of type User, but somehow I can't get the typing to work
type OnChangeFunc = (token: string, user: unknown) => void

interface AuthContext {
  authenticated: Signal<boolean>
  roles: Signal<UserRole[]>
  login(user: string, password: string): Promise<RecordAuthResponse<Record>>
  logout(): void
}

export const AuthContext = createContextId<AuthContext>('auth-context')

export const createPocketbase = $((onChangeHandler?: QRL<OnChangeFunc>) => {
  const pb = new Pocketbase(import.meta.env.VITE_API_URL)

  if (onChangeHandler) {
    pb.authStore.onChange(onChangeHandler)
  }

  noSerialize(pb)
  return pb
})

export const AuthProvider = component$(() => {
  const authenticated = useSignal<boolean>(false)
  const roles = useSignal<UserRole[]>([])
  const updateAuthStore = $((token: string, user: User) => {
    authenticated.value = !!token
    roles.value = user.roles
  }) as QRL<OnChangeFunc>

  useVisibleTask$(async () => {
    const qrlPb = await createPocketbase(updateAuthStore)
    authenticated.value = qrlPb.authStore.isValid
    roles.value = qrlPb.authStore.model?.roles ?? []
  })

  const login = $(async (user: string, password: string) => {
    const qrlPb = await createPocketbase(updateAuthStore)

    try {
      const authRecord = await qrlPb
        .collection('users')
        .authWithPassword(user, password)

      return authRecord
    } catch (e: any) {
      throw new ClientResponseError(e)
    }
  })

  const logout = $(async () => {
    const qrlPb = await createPocketbase(updateAuthStore)
    qrlPb.authStore.clear()
  })

  useContextProvider(AuthContext, {
    authenticated,
    roles,
    login,
    logout,
  })

  return <Slot />
})
