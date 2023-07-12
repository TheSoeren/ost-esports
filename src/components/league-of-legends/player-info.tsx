import {
  Resource,
  component$,
  useResource$,
  useSignal,
  useTask$,
} from '@builder.io/qwik'
import type { Player, User } from '~/types'
import fetch from '~/ajax'

export default component$(({ id, user, roleIcon, collectionId }: Player) => {
  const src = useSignal('')

  useTask$(({ track }) => {
    track(() => roleIcon)
    src.value = `${
      import.meta.env.VITE_API_URL
    }/api/files/${collectionId}/${id}/${roleIcon}`
  })

  const userResource = useResource$<User>(({ cleanup }) => {
    const controller = new AbortController()
    cleanup(() => controller.abort())

    return getUser(controller, user)
  })

  return (
    <>
      <img class="player-info__role" src={src.value} alt={roleIcon} />

      <Resource
        value={userResource}
        onPending={() => <>Loading...</>}
        onRejected={(error) => <>Error: {error.message}</>}
        onResolved={(user) => (
          <div>username: {user.name ? user.name : user.username}</div>
        )}
      />
    </>
  )
})

export async function getUser(
  controller?: AbortController,
  id?: string
): Promise<User> {
  const response = await fetch(`/api/collections/users/records/${id}`, {
    signal: controller?.signal,
  })

  return response.json()
}
