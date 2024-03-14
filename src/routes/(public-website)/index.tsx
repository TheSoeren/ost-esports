import {
  Resource,
  component$,
  useResource$,
  useStylesScoped$,
} from '@builder.io/qwik'
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city'
import NewsTile from '~/components/news/news-tile'
import NewsTileSkeleton from '~/components/news/news-tile-skeleton'
import PlMatchList from '~/components/teams/league-of-legends/pl-match-list'
import { Collection, type NewsEntry, type Team } from '~/types'
import styles from '~/css/index.css?inline'
import usePocketbase from '~/hooks/usePocketbase'
import PocketBase from 'pocketbase'
import type { ResolvedGameSpecificData } from '~/data/teams/team-tile-mapping'
import {
  getGameSpecificData,
  isLeagueOfLegendsData,
} from '~/data/teams/team-tile-mapping'
import { LEAGUE_OF_LEGENDS } from '~/data/games/game-id'
import ClubSummary from '~/components/club-summary'

interface UseTeamFetchingResponse {
  teams: Team[]
  gameSpecificData: ResolvedGameSpecificData
}

/*
 * If you generalize this to fetch game specific data about all teams (not only lol)
 * remember to add a condition to the rendering of <PlMatchList/>.
 */
export const useTeamData = routeLoader$<UseTeamFetchingResponse>(async () => {
  const pb = new PocketBase(import.meta.env.VITE_API_URL)

  const teams = await pb.collection(Collection.TEAMS).getFullList<Team>({
    filter: `game="${LEAGUE_OF_LEGENDS}"`,
    expand: 'membership(team).user',
    $cancelKey: LEAGUE_OF_LEGENDS,
  })

  const gameSpecificData = await getGameSpecificData(teams, LEAGUE_OF_LEGENDS)

  return structuredClone({ teams, gameSpecificData })
})

export default component$(() => {
  useStylesScoped$(styles)
  const pb = usePocketbase()

  const teamResource = useTeamData()
  const newsResource = useResource$<NewsEntry>(async () => {
    const response = await pb
      .collection(Collection.NEWS)
      .getFirstListItem<NewsEntry>('', {
        sort: '-publishDate',
      })

    return structuredClone(response)
  })

  const renderMatchSection = () => {
    const data = teamResource.value.gameSpecificData

    if (isLeagueOfLegendsData(data)) {
      return (
        <section class="match-section">
          {data.plTeamList.map((plTeam) => (
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
      <Resource
        value={newsResource}
        onPending={() => <NewsTileSkeleton />}
        onRejected={(error) => <>Error: {error.message}</>}
        onResolved={(news) => <NewsTile {...news} />}
      />
      <div>{renderMatchSection()}</div>
    </article>
  )
})

export const head: DocumentHead = {
  title: 'OST eSports',
}
