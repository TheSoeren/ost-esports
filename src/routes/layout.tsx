import { component$, Slot } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import type { ListResult } from 'pocketbase'
import Footer from '~/components/footer'
import Header from '~/components/header'
import { LEAGUE_OF_LEGENDS } from '~/data/teams/team-tile-mapping'
import pb from '~/pocketbase'
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
  const teams = await pb.collection('teams').getList<Team>(1, 30, {
    filter: `game="${LEAGUE_OF_LEGENDS}"`,
    expand: 'membership(team).user',
    $cancelKey: LEAGUE_OF_LEGENDS,
  })

  const gameSpecificData = async () => {
    const registeredTeams = teams.items
      .filter((team) => !!(team.gameSpecificData.plTeamId as number))
      .map((team) => team.gameSpecificData.plTeamId as number)

    const plTeamList = await Promise.all(
      registeredTeams.map((plTeamId: number) =>
        fetch(`https://www.primebot.me/api/teams/${plTeamId}`)
      )
    ).then((responses) => Promise.all(responses.map((res) => res.json())))

    if (plTeamList.length) {
      return plTeamList
    }

    return []
  }

  return structuredClone({ teams, gameSpecificData: await gameSpecificData() })
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
