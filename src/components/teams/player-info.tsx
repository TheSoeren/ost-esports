import {
  Resource,
  component$,
  useResource$,
  useStylesScoped$,
} from '@builder.io/qwik'
import type { Player, User } from '~/types'
import { getUser } from '~/data/teams/data-fetching'
import styles from '~/css/teams/player-info.css?inline'

export default component$(({ user }: Player) => {
  useStylesScoped$(styles)

  const userResource = useResource$<User>(({ cleanup }) => {
    const controller = new AbortController()
    cleanup(() => controller.abort())

    return getUser(user, controller)
  })

  return (
    <section class="player-info">
      <img class="player-info__icon" src="/profile.png" alt="Profile Picture" />

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
