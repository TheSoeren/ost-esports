import {
  component$,
  Resource,
  useResource$,
  useStyles$,
} from '@builder.io/qwik'
import { useLocation } from '@builder.io/qwik-city'
import TeamTile from '~/components/teams/team-tile'
import styles from '~/css/teams.css?inline'
import type { ListResult, Team } from '~/types'

export default component$(() => {
  useStyles$(styles)

  const { params } = useLocation()

  const teamsResource = useResource$<ListResult<Team>>(({ cleanup }) => {
    const controller = new AbortController()
    cleanup(() => controller.abort())

    return getTeams(controller, params.id)
  })

  return (
    <article class="page-content">
      <div class="teams__container">
        <Resource
          value={teamsResource}
          onPending={() => <>Loading...</>}
          onRejected={(error) => <>Error: {error.message}</>}
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
  controller?: AbortController,
  gameId?: string
): Promise<ListResult<Team>> {
  const response = await fetch(
    `http://159.69.196.31/api/collections/teams/records?filter=(game="${gameId}")`,
    {
      signal: controller?.signal,
    }
  )

  return await response.json()
}
