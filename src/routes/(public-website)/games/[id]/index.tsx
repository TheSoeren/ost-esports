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
import { type Team } from '~/types'
import { getTeamsByGameId } from '~/services/team-service'

interface UseTeamData {
  teams: Team[]
  gameSpecificData: ResolvedGameSpecificData
}

export const useTeamData = routeLoader$<UseTeamData>(async ({ params }) => {
  const teams = await getTeamsByGameId(params.id)
  const gameSpecificData = await getGameSpecificData(teams, params.id)

  return { teams, gameSpecificData }
})

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
