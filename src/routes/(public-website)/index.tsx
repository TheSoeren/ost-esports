import { component$, useStylesScoped$ } from '@builder.io/qwik'
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city'
import NewsTile from '~/components/news/news-tile'
import PlMatchList from '~/components/teams/league-of-legends/pl-match-list'
import { type NewsEntry, type Team } from '~/types'
import styles from '~/css/index.css?inline'
import type { ResolvedGameSpecificData } from '~/data/teams/team-tile-mapping'
import {
  getGameSpecificData,
  isLeagueOfLegendsData,
} from '~/data/teams/team-tile-mapping'
import { LEAGUE_OF_LEGENDS } from '~/data/games/game-id'
import ClubSummary from '~/components/club-summary'
import { getLolTeams } from '~/services/team-service'
import { getLatestNewsEntry } from '~/services/news-service'

interface UseDataResponse {
  teamResource: {
    teams: Team[]
    gameSpecificData: ResolvedGameSpecificData
  }
  newsEntry: NewsEntry
}

export async function getTeamData() {
  const teams = await getLolTeams()
  const gameSpecificData = await getGameSpecificData(teams, LEAGUE_OF_LEGENDS)

  return { teams, gameSpecificData }
}

/*
 * If you generalize this to fetch game specific data about all teams (not only LoL)
 * remember to add a condition to the rendering of <PlMatchList/>.
 */
export const useData = routeLoader$<UseDataResponse>(async () => {
  const [teamResource, newsEntry] = await Promise.all([
    getTeamData(),
    getLatestNewsEntry(),
  ])

  return { teamResource, newsEntry }
})

export default component$(() => {
  useStylesScoped$(styles)

  const data = useData()
  const { teamResource, newsEntry } = data.value

  const renderMatchSection = () => {
    const data = teamResource.gameSpecificData

    if (isLeagueOfLegendsData(data)) {
      const teamsWithMatches = data.plTeamList.filter(
        (plTeam) => plTeam.matches.length > 0
      )
      if (teamsWithMatches.length <= 0) {
        return null
      }

      return (
        <section class="match-section">
          {teamsWithMatches.map((plTeam) => (
            <div key={plTeam.id} class="tile match-section__tile">
              <h2 class="text-2xl mb-4">Spiele von {plTeam.name}</h2>
              <PlMatchList matches={plTeam.matches} />
            </div>
          ))}
        </section>
      )
    }

    return null
  }

  return (
    <article class="home-page">
      <ClubSummary />
      <NewsTile {...newsEntry} />
      <div>{renderMatchSection()}</div>
    </article>
  )
})

export const head: DocumentHead = {
  title: 'OST eSports',
}
