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
import type { Game, Team } from '~/types'
import { getTeamsByGameId } from '~/services/team-service'
import { getGame } from '~/services/games-service'

interface UseTeamData {
  teams: Team[]
  gameSpecificData: ResolvedGameSpecificData
  game: Game
}

export const useTeamData = routeLoader$<UseTeamData>(async ({ params }) => {
  const gamePromise = getGame(params.id)
  const teams = await getTeamsByGameId(params.id)
  const gameSpecificDataPromise = getGameSpecificData(teams, params.id)

  const [game, gameSpecificData] = await Promise.all([
    gamePromise,
    gameSpecificDataPromise,
  ])

  return { teams, game, gameSpecificData }
})

export default component$(() => {
  useStylesScoped$(styles)

  const { params } = useLocation()
  const TeamTile = getTeamTile(params.id)
  const teamData = useTeamData()

  return (
    <article>
      <BackButton href="/games" label="Game Auswahl" />
      <div class="teams__container">
        {teamData.value.teams.map((team) => (
          <TeamTile key={team.id} {...team} />
        ))}
      </div>
    </article>
  )
})

export const head: DocumentHead = ({ resolveValue }) => {
  const { game } = resolveValue(useTeamData)

  return {
    title: game.name + ' Teams',
    meta: [
      {
        name: 'game',
        content: game.name,
      },
    ],
  }
}
