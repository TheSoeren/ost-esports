import { component$, Slot } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import type { ListResult } from 'pocketbase'
import Footer from '~/components/footer'
import Header from '~/components/header'
import {
  getGameSpecificData,
  LEAGUE_OF_LEGENDS,
} from '~/data/teams/team-tile-mapping'
import type { Team } from '~/types'
import type { PlTeamDetailed } from '~/types/primeleague'

interface UseTeamFetchingResponse {
  teams: ListResult<Team>
  gameSpecificData: PlTeamDetailed[]
}

/*
 * If you generalize this to fetch game specific data about all teams (not only lol)
 * remember to add a condition to the rendering of <PlMatchList/> in the root index.tsx.
 */
export const useTeamData = routeLoader$<UseTeamFetchingResponse>(async () => {
  const response = await fetch(
    `https://api.ost-esports.ch/api/collections/teams/records?filter=(game="${LEAGUE_OF_LEGENDS}")`
  )

  const teams = await response.json()

  // const teams = await pb.collection('teams').getList<Team>(1, 30, {
  //   filter: `game="${LEAGUE_OF_LEGENDS}"`,
  //   expand: 'membership(team).user',
  //   $cancelKey: LEAGUE_OF_LEGENDS,
  // })

  const gameSpecificData = await getGameSpecificData(teams, LEAGUE_OF_LEGENDS)

  return structuredClone({ teams, gameSpecificData })
})

export default component$(() => {
  return (
    <section class="flex flex-col min-h-screen">
      <Header />
      <main class="page-content">
        <Slot />
      </main>
      <Footer />
    </section>
  )
})
