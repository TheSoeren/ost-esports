import { component$, useStylesScoped$ } from '@builder.io/qwik'
import type { User } from '~/types'
import styles from '~/css/teams/player-info.css?inline'
import ImgProfile from '~/media/profile.webp?jsx'

export default component$(({ gamertag, username }: User) => {
  useStylesScoped$(styles)

  return (
    <section class="player-info">
      <ImgProfile class="player-info__icon" alt="Profilbild" />
      <div class="player-info__text">{gamertag ? gamertag : username}</div>
    </section>
  )
})
