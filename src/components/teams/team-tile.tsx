import {
  component$,
  useSignal,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik'
import type { Membership, Player, Team } from '~/types'
import PlayerInfo from '~/components/teams/player-info'
import styles from '~/css/teams/team-tile.css?inline'

export default component$(
  ({ id, name, expand: { ['membership(team)']: memberships } }: Team) => {
    useStylesScoped$(styles)

    const sigMembership = useSignal<Membership[]>()
    const sigPlayers = useSignal<Player[]>()

    useTask$(({ track }) => {
      track(() => memberships)

      sigMembership.value = memberships?.filter(
        (m: Membership) => m.team === id
      )
      // @ts-expect-error
      sigPlayers.value = sigMembership.value?.map(
        (m: Membership) => m.expand['user']
      )
    })

    return (
      <div class="tile team-tile">
        <div class="team-tile__name">{name}</div>
        {sigPlayers.value?.map((player) => (
          // @ts-expect-error
          <PlayerInfo key={player.id} {...player} />
        ))}
      </div>
    )
  }
)
