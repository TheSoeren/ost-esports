import type { Membership, Player, Team } from '~/types'
import PlayerInfo from '~/components/teams/league-of-legends/player-info'
import styles from '~/css/teams/team-tile.css?inline'
import PlMatchList from './pl-match-list'
import {
  component$,
  useSignal,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik'
import { useTeamData } from '~/routes/games/[id]'
import type { PlTeamDetailed } from '~/types/primeleague'

export default component$(
  ({ id, name, expand: { ['membership(team)']: memberships } }: Team) => {
    useStylesScoped$(styles)

    const teamResource = useTeamData()

    const sigMembership = useSignal<Membership[]>()
    const sigPlayers = useSignal<Player[]>()
    const plTeam = useSignal<PlTeamDetailed>()

    useTask$(({ track }) => {
      track(() => teamResource.value.gameSpecificData)

      plTeam.value = teamResource.value.gameSpecificData.find(
        (plTeam) => plTeam.name === name
      )
    })

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
      <div class={['tile team-tile', plTeam.value ? 'team-tile--pl' : '']}>
        <div class="team-tile__name">{name}</div>
        <div class="flex flex-col sm:flex-row">
          <div class="team-tile__player-section">
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
          <div class="team-tile__match-section">
            {plTeam.value?.matches && (
              <PlMatchList matches={plTeam.value?.matches} />
            )}
          </div>
        </div>
      </div>
    )
  }
)
