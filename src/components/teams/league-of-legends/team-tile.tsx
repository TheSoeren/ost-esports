import {
  component$,
  useSignal,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik'
import type { Membership, Player, Team } from '~/types'
import PlayerInfo from '~/components/teams/league-of-legends/player-info'
import styles from '~/css/teams/team-tile.css?inline'

export default component$(
  ({ id, name, expand: { ['membership(team)']: memberships } }: Team) => {
    useStylesScoped$(styles)

    const sigMembership = useSignal<Membership[]>()
    const sigPlayers = useSignal<Player[]>()

    useTask$(({ track }) => {
      track(() => memberships)

      sigMembership.value = (memberships as Membership[])?.filter(
        (m: Membership) => m.team === id
      )
      sigPlayers.value = sigMembership.value?.map(
        (m: Membership) => m.expand['user'] as Player
      )
    })

    return (
      <div class="tile team-tile">
        <div class="team-tile__name">{name}</div>
        {sigPlayers.value?.map((player) => {
          const membership = sigMembership.value?.find(
            (m) => m.user === player.id
          )

          if (!membership) return null

          return (
            <PlayerInfo
              key={player.id}
              membership={membership}
              player={player}
            />
          )
        })}
      </div>
    )
  }
)
