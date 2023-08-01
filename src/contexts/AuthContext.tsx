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
import type { RegisterForm } from '~/routes/public/register'
import { Collection, type Record, type User } from '~/types'

// We know user is always of type User, but somehow I can't get the typing to work
type OnChangeFunc = (token: string, user: unknown) => void

interface AuthContext {
  authenticated: Signal<boolean>
  authUser: Signal<User | null>
  pocketbase(): Promise<Pocketbase>
  register(values: RegisterForm): Promise<Record>
  login(user: string, password: string): Promise<RecordAuthResponse<Record>>
  logout(): void
}

export const isUserObject = (
  data: Signal<User | null>
): data is Signal<User> => {
  if (!data || !data.value) {
    return false
  }

  if ('id' in data.value) {
    return true
  }

  return false
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
  const authUser = useSignal<User | null>(null)

  const updateAuthStore = $((token: string, user: User) => {
    authenticated.value = !!token
    noSerialize(user)
    authUser.value = user
  }) as QRL<OnChangeFunc>

  useVisibleTask$(async () => {
    const qrlPb = await createPocketbase(updateAuthStore)
    authenticated.value = qrlPb.authStore.isValid
    const temp = qrlPb.authStore?.model as Record as User
    noSerialize(temp)
    authUser.value = temp ?? null
  })

  const login = $(async (user: string, password: string) => {
    const qrlPb = await createPocketbase(updateAuthStore)

    try {
      const authRecord = await qrlPb
        .collection(Collection.USERS)
        .authWithPassword(user, password)

      return authRecord
    } catch (e: any) {
      throw new ClientResponseError(e)
    }
  })

  const register = $(async (values: RegisterForm) => {
    const qrlPb = await createPocketbase(updateAuthStore)

    try {
      const authRecord = await qrlPb.collection(Collection.USERS).create(values)

      return authRecord
    } catch (e: any) {
      throw new ClientResponseError(e)
    }
  })

  const logout = $(async () => {
    const qrlPb = await createPocketbase(updateAuthStore)
    qrlPb.authStore.clear()
  })

  const pocketbase = $(async () => {
    return await createPocketbase(updateAuthStore)
  })

  useContextProvider(AuthContext, {
    authenticated,
    authUser,
    pocketbase,
    register,
    login,
    logout,
  })

  return <Slot />
})
