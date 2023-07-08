import { component$, useStylesScoped$ } from '@builder.io/qwik'
import type { Membership, Player } from '~/types'
import styles from '~/css/teams/player-info.css?inline'
import usePocketbase from '~/hooks/usePocketBase'

interface PlayerInfo {
  membership: Membership
  player: Player
}

export default component$(({ player, membership }: PlayerInfo) => {
  useStylesScoped$(styles)
  const pb = usePocketbase()

  return (
    <section class="player-info">
      <img
        class="player-info__icon"
        src={pb.files.getUrl(membership, membership.roleIcon)}
        alt="Role Icon"
      />
      <div class="player-info__text">
        {player.name ? player.name : player.username}
      </div>
    </section>
  )
})
