import {
  Resource,
  component$,
  noSerialize,
  useResource$,
  useStylesScoped$,
} from '@builder.io/qwik'
import type { Player, User } from '~/types'
import styles from '~/css/teams/player-info.css?inline'
import pb from '~/pocketbase'

export default component$(({ user: userId }: Player) => {
  useStylesScoped$(styles)

  const userResource = useResource$<User>(async () => {
    const response = await pb.collection('users').getOne<User>(userId)
    noSerialize(response)
    return response
  })

  return (
    <section class="player-info">
      <img
        class="player-info__icon"
        src="/profile.webp"
        alt="Profile Picture"
      />

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
