import { Resource, component$, useResource$ } from '@builder.io/qwik'
import type { Player, User } from '~/types'
import fetch from '~/ajax'

export default component$(({ user }: Player) => {
  const userResource = useResource$<User>(({ cleanup }) => {
    const controller = new AbortController()
    cleanup(() => controller.abort())

    return getUser(user, controller)
  })

  return (
    <Resource
      value={userResource}
      onPending={() => <>Loading...</>}
      onRejected={(error) => <>Error: {error.message}</>}
      onResolved={(user) => (
        <div>username: {user.name ? user.name : user.username}</div>
      )}
    />
  )
})

export async function getUser(
  id: string,
  controller?: AbortController
): Promise<User> {
  const response = await fetch(`/api/collections/users/records/${id}`, {
    signal: controller?.signal,
  })

  return response.json()
}
