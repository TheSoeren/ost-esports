import { component$, useStylesScoped$ } from '@builder.io/qwik'
import type { User } from '~/types'
import styles from '~/css/teams/player-info.css?inline'

export default component$(({ name, username }: User) => {
  useStylesScoped$(styles)

  return (
    <section class="player-info">
      <img
        class="player-info__icon"
        src="/profile.webp"
        alt="Profile Picture"
      />
      <div class="player-info__text">{name ? name : username}</div>
    </section>
  )
})
