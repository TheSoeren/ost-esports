import { component$, useStylesScoped$ } from '@builder.io/qwik'
import type { Membership, User } from '~/types'
import styles from '~/css/teams/player-info.css?inline'
import pb from '~/services/pocketbase'

interface PlayerInfo {
  membership: Membership
  player: User
}

export default component$(({ player, membership }: PlayerInfo) => {
  useStylesScoped$(styles)

  return (
    <section class="player-info">
      <img
        class="player-info__icon"
        src={pb.files.getUrl(membership, membership.roleIcon, {
          thumb: '32x32',
        })}
        alt="Role Icon"
      />
      <div class="player-info__text">
        {player.gamertag ? player.gamertag : player.username}
      </div>
    </section>
  )
})
