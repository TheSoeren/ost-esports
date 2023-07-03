import { component$, useStylesScoped$ } from '@builder.io/qwik'
import {
  type DocumentHead,
  useLocation,
  routeLoader$,
} from '@builder.io/qwik-city'
import styles from '~/css/teams/index.css?inline'
import type { Team } from '~/types'
import { isLoL, getTeamTile } from '~/data/teams/team-tile-mapping'
import pb from '~/pocketbase'
import BackButton from '~/components/elements/back-button'
import type { PlListResult, PlTeam, PlTeamDetailed } from '~/types/primeleague'
import type { ListResult } from 'pocketbase'

interface UseTeamFetchingResponse {
  teams: ListResult<Team>
  plTeamList: PlTeamDetailed[]
}

export const useTeamFetching = routeLoader$<UseTeamFetchingResponse>(
  async (requestEvent) => {
    const teams = await pb.collection('teams').getList<Team>(1, 30, {
      filter: `game="${requestEvent.params.id}"`,
      expand: 'membership(team).user',
      $cancelKey: requestEvent.params.id,
    })

    if (!isLoL(requestEvent.params.id)) {
      return { teams, plTeamList: [] }
    }

    const plTeamResponses = await Promise.all(
      teams.items.map((team: Team) =>
        fetch(`https://www.primebot.me/api/teams/?name=${team.name}`)
      )
    )
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((teams) =>
        teams
          .flatMap((team: PlListResult<PlTeam>) => team.results)
          .filter(
            (team: PlTeam) => team.matches_count && team.matches_count > 0
          )
      )

    const plTeamList = await Promise.all(
      plTeamResponses.map((team: PlTeam) =>
        fetch(`https://www.primebot.me/api/teams/${team.id}`)
      )
    ).then((responses) => Promise.all(responses.map((res) => res.json())))

    return structuredClone({ teams, plTeamList })
  }
)

export default component$(() => {
  useStylesScoped$(styles)

  const { params } = useLocation()
  const TeamTile = getTeamTile(params.id)
  const teamsResource = useTeamFetching()

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
