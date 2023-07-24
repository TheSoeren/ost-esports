import { component$, useStylesScoped$ } from '@builder.io/qwik'
import {
  type DocumentHead,
  useLocation,
  routeLoader$,
} from '@builder.io/qwik-city'
import styles from '~/css/teams/index.css?inline'
import type { ResolvedGameSpecificData } from '~/data/teams/team-tile-mapping'
import {
  getGameSpecificData,
  getTeamTile,
} from '~/data/teams/team-tile-mapping'
import BackButton from '~/components/elements/back-button'
import { Collection, type Team } from '~/types'
import PocketBase from 'pocketbase'

interface UseTeamFetchingResponse {
  teams: Team[]
  gameSpecificData: ResolvedGameSpecificData
}

export const useTeamData = routeLoader$<UseTeamFetchingResponse>(
  async (requestEvent) => {
    const pb = new PocketBase(import.meta.env.VITE_API_URL)

    const teams = await pb.collection(Collection.TEAMS).getFullList<Team>({
      filter: `game="${requestEvent.params.id}" && hidden=false`,
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
        {teamsResource.value.teams.map((team) => (
          <TeamTile key={team.id} {...team} />
        ))}
      </div>
    </article>
  )
})

export const head: DocumentHead = {
  title: 'OST eSports - Teams',
}
