import {
  component$,
  Resource,
  useResource$,
  useStylesScoped$,
} from '@builder.io/qwik'
import { type DocumentHead, useLocation } from '@builder.io/qwik-city'
import styles from '~/css/teams/index.css?inline'
import type { ListResult, Team } from '~/types'
import fetch from '~/ajax'
import getTeamTile from '~/data/teams/team-tile-mapping'

export default component$(() => {
  useStylesScoped$(styles)

  const { params } = useLocation()
  const TeamTile = getTeamTile(params.id)
  const teamsResource = useResource$<ListResult<Team>>(({ cleanup }) => {
    const controller = new AbortController()
    cleanup(() => controller.abort())

    return getTeams(params.id, controller)
  })

  return (
    <article class="page-content">
      <div class="teams__container">
        <Resource
          value={teamsResource}
          onResolved={(teams) => (
            <>
              {teams.items.map((team, index) => (
                <TeamTile key={index} {...team} />
              ))}
            </>
          )}
        />
      </div>
    </article>
  )
})

export async function getTeams(
  gameId: string,
  controller?: AbortController
): Promise<ListResult<Team>> {
  const response = await fetch(
    `/api/collections/teams/records?filter=(game="${gameId}")`,
    {
      signal: controller?.signal,
    }
  )

  return response.json()
}

export const head: DocumentHead = {
  title: 'OST Teams',
}
