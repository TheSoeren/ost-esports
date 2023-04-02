import {
  Resource,
  component$,
  useResource$,
  useSignal,
  useTask$,
} from '@builder.io/qwik'
import type { Player, User } from '~/types'

export default component$(({ id, user, roleIcon, collectionId }: Player) => {
  const src = useSignal('')

  useTask$(({ track }) => {
    track(() => roleIcon)
    src.value = `http://159.69.196.31/api/files/${collectionId}/${id}/${roleIcon}`
  })

  const userResource = useResource$<User>(({ cleanup }) => {
    const controller = new AbortController()
    cleanup(() => controller.abort())

    return getUser(user, controller)
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
  id: string,
  controller?: AbortController
): Promise<User> {
  const response = await fetch(
    `http://159.69.196.31/api/collections/users/records/${id}`,
    {
      signal: controller?.signal,
    }
  )

  return response.json()
}
