import { component$, useStylesScoped$ } from '@builder.io/qwik'
import type { User } from '~/types'
import styles from '~/css/teams/player-info.css?inline'

export default component$(({ gamertag, username }: User) => {
  useStylesScoped$(styles)

  return (
    <section class="player-info">
      <img class="player-info__icon" src="/profile.webp" alt="Profilbild" />
      <div class="player-info__text">{gamertag ? gamertag : username}</div>
    </section>
  )
})
