import {
  component$,
  useSignal,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik'
import type { Membership, User, Team } from '~/types'
import PlayerInfo from '~/components/teams/player-info'
import styles from '~/css/teams/team-tile.css?inline'

export default component$(
  ({ id, name, expand: { ['membership(team)']: memberships } }: Team) => {
    useStylesScoped$(styles)

    const sigMembership = useSignal<Membership[]>()
    const sigPlayers = useSignal<User[]>()

    useTask$(({ track }) => {
      track(() => memberships)

      sigMembership.value = (memberships as Membership[])?.filter(
        (m: Membership) => m.team === id
      )
      sigPlayers.value = sigMembership.value?.map(
        (m: Membership) => m.expand['user'] as User
      )
    })

    return (
      <div class="tile team-tile">
        <h2 class="team-tile__name">{name}</h2>
        {sigPlayers.value?.map((player) => (
          <PlayerInfo key={player.id} {...player} />
        ))}
      </div>
    )
  }
)
