import type { Signal } from '@builder.io/qwik'
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
import { ClientResponseError, type RecordAuthResponse } from 'pocketbase'
import type { RegisterForm } from '~/routes/public/register'
import pb from '~/services/pocketbase'
import { login, register } from '~/services/user-service'
import { type Record, type User } from '~/types'

interface AuthContext {
  authenticated: Signal<boolean>
  authUser: Signal<User | null>
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

export const AuthProvider = component$(() => {
  const authenticated = useSignal<boolean>(false)
  const authUser = useSignal<User | null>(null)

  useVisibleTask$(async () => {
    // TODO: Figure out if `authenticated` can be used more instead of `authUser.value`
    authenticated.value = pb.authStore.isValid
    const temp = pb.authStore?.model as Record as User
    noSerialize(temp)
    authUser.value = temp ?? null
  })

  const handleLogin = $(async (user: string, password: string) => {
    try {
      return login(user, password)
    } catch (e) {
      throw new ClientResponseError(e)
    }
  })

  const handleRegistration = $(async (values: RegisterForm) => {
    try {
      return register(values)
    } catch (e) {
      throw new ClientResponseError(e)
    }
  })

  const logout = $(async () => {
    pb.authStore.clear()
  })

  useContextProvider(AuthContext, {
    authenticated,
    authUser,
    register: handleRegistration,
    login: handleLogin,
    logout,
  })

  return <Slot />
})
