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
import type { NewsEntry, Team } from '~/types'
import styles from '~/css/index.css?inline'
import usePocketbase from '~/hooks/usePocketbase'
import type { ListResult } from 'pocketbase'
import Pocketbase from 'pocketbase'
import type { ResolvedGameSpecificData } from '~/data/teams/team-tile-mapping'
import {
  LEAGUE_OF_LEGENDS,
  getGameSpecificData,
  isLeagueOfLegendsData,
} from '~/data/teams/team-tile-mapping'

interface UseTeamFetchingResponse {
  teams: ListResult<Team>
  gameSpecificData: ResolvedGameSpecificData
}

/*
 * If you generalize this to fetch game specific data about all teams (not only lol)
 * remember to add a condition to the rendering of <PlMatchList/>.
 */
export const useTeamData = routeLoader$<UseTeamFetchingResponse>(async () => {
  const pb = new Pocketbase(import.meta.env.VITE_API_URL)

  const teams = await pb.collection('teams').getList<Team>(1, 30, {
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
      .collection('news')
      .getFirstListItem<NewsEntry>('', {
        sort: '-publishDate',
      })

    return structuredClone(response)
  })

  const renderMatchSection = () => {
    const data = teamResource.value?.gameSpecificData

    if (isLeagueOfLegendsData(data)) {
      return (
        <div class="match-section">
          {data.plTeamList.map((plTeam) => (
            <>
              <div key={plTeam.id} class="tile match-section__tile">
                <h2 class="text-2xl mb-4">Spiele von {plTeam.name}</h2>
                <PlMatchList matches={plTeam.matches} />
              </div>
            </>
          ))}
        </div>
      )
    }

    return null
  }

  return (
    <article class="home-page">
      <Resource
        value={newsResource}
        onPending={() => <NewsTileSkeleton />}
        onRejected={(error) => <>Error: {error.message}</>}
        onResolved={(news) => <NewsTile {...news} />}
      />
      {renderMatchSection()}
    </article>
  )
})

export const head: DocumentHead = {
  title: 'OST eSports',
}
