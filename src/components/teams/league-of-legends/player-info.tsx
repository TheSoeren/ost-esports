import { component$, useStylesScoped$ } from '@builder.io/qwik'
import type { Membership, User } from '~/types'
import styles from '~/css/teams/player-info.css?inline'
import usePocketbase from '~/hooks/usePocketbase'

interface PlayerInfo {
  membership: Membership
  player: User
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
