import { component$, useStylesScoped$ } from '@builder.io/qwik'
import {
  type DocumentHead,
  useLocation,
  routeLoader$,
} from '@builder.io/qwik-city'
import styles from '~/css/teams/index.css?inline'
import type { Team } from '~/types'
import {
  getGameSpecificData,
  getTeamTile,
} from '~/data/teams/team-tile-mapping'
import pb from '~/pocketbase'
import BackButton from '~/components/elements/back-button'
import type { PlTeamDetailed } from '~/types/primeleague'
import type { ListResult } from 'pocketbase'

interface UseTeamFetchingResponse {
  teams: ListResult<Team>
  gameSpecificData: PlTeamDetailed[]
}

export const useTeamData = routeLoader$<UseTeamFetchingResponse>(
  async (requestEvent) => {
    const teams = await pb.collection('teams').getList<Team>(1, 30, {
      filter: `game="${requestEvent.params.id}"`,
      expand: 'membership(team).user',
      $cancelKey: requestEvent.params.id,
    })

    const gameSpecificData = await getGameSpecificData(
      teams,
      requestEvent.params.id
    )

    return structuredClone({ teams, gameSpecificData })
  }
)

export default component$(() => {
  useStylesScoped$(styles)

  const { params } = useLocation()
  const TeamTile = getTeamTile(params.id)
  const teamsResource = useTeamData()

  return (
    <article>
      <BackButton href="/games" label="Game Auswahl" />
      <div class="teams__container">
        {teamsResource.value.teams.items.map((team) => (
          <TeamTile key={team.id} {...team} />
        ))}
      </div>
    </article>
  )
})

export const head: DocumentHead = {
  title: 'OST eSports - Teams',
}
