import {
  component$,
  Resource,
  useResource$,
  useStyles$,
} from '@builder.io/qwik'
import { useLocation } from '@builder.io/qwik-city'
import styles from '~/css/teams/index.css?inline'
import type { ListResult, Team } from '~/types'
import fetch from '~/ajax'
import TeamTile from '~/components/teams/team-tile'

export default component$(() => {
  useStyles$(styles)

  const { params } = useLocation()
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
