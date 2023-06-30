import {
  component$,
  Resource,
  useResource$,
  useStylesScoped$,
} from '@builder.io/qwik'
import { type DocumentHead, useLocation } from '@builder.io/qwik-city'
import styles from '~/css/teams/index.css?inline'
import type { Team } from '~/types'
import getTeamTile from '~/data/teams/team-tile-mapping'
import pb from '~/pocketbase'
import BackButton from '~/components/elements/back-button'
import usePagination from '~/hooks/usePagination'
import Pagination from '~/components/elements/pagination'
import type { ListResult } from 'pocketbase'

export default component$(() => {
  useStylesScoped$(styles)

  const pagination = usePagination(1, 30)
  const { params } = useLocation()
  const TeamTile = getTeamTile(params.id)
  const teamsResource = useResource$<ListResult<Team>>(async ({ track }) => {
    track(() => pagination.page.value)

    const response = await pb
      .collection('teams')
      .getList<Team>(pagination.page.value, pagination.perPage.value, {
        filter: `game="${params.id}"`,
        expand: 'membership(team).user',
        $cancelKey: params.id,
      })
    pagination.setTotalPages(response.totalPages)
    return structuredClone(response)
  })

  return (
    <article>
      <BackButton href="/games" label="Game Auswahl" />
      <Pagination {...pagination} />
      <div class="teams__container">
        <Resource
          value={teamsResource}
          onResolved={(teams) => (
            <>
              {teams.items.map((team) => (
                <TeamTile key={team.id} {...team} />
              ))}
            </>
          )}
        />
      </div>
      <Pagination {...pagination} />
    </article>
  )
})

export const head: DocumentHead = {
  title: 'OST eSports - Teams',
}
