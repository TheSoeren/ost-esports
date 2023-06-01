import {
  Resource,
  component$,
  useResource$,
  useSignal,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik'
import type { Player, User } from '~/types'
import { getUser } from '~/data/teams/data-fetching'
import styles from '~/css/teams/player-info.css?inline'

export default component$(
  ({ collectionId, id, user: userId, roleIcon }: Player) => {
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

      return getUser(userId, controller)
    })

    return (
      <section class="player-info">
        <img class="player-info__icon" src={src.value} alt="Profile Picture" />

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
  }
)
