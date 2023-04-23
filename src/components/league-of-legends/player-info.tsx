import {
  Resource,
  component$,
  useResource$,
  useSignal,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik'
import type { Player, User } from '~/types'
import fetch from '~/ajax'
import styles from '~/css/teams/lol-player-info.css?inline'

export default component$(({ id, user, roleIcon, collectionId }: Player) => {
  useStylesScoped$(styles)
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

    return getUser(user, controller)
  })

  return (
    <section class="player-info">
      <img class="player-info__role" src={src.value} alt={roleIcon} />

      <Resource
        value={userResource}
        onPending={() => <>Loading...</>}
        onRejected={(error) => <>Error: {error.message}</>}
        onResolved={(user) => (
          <div class="player-info__text">
            {user.name ? user.name : user.username}
          </div>
        )}
      />
    </section>
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
