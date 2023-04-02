import {
  component$,
  Resource,
  useResource$,
  useStyles$,
} from '@builder.io/qwik'
import { useLocation } from '@builder.io/qwik-city'
import styles from '~/css/teams.css?inline'
import type { Game, ListResult, Team } from '~/types'
import getTeamTile from '~/data/team-tile-map'

export default component$(() => {
  useStyles$(styles)

  const { params } = useLocation()

  const teamsResource = useResource$<ListResult<Team>>(({ cleanup }) => {
    const controller = new AbortController()
    cleanup(() => controller.abort())

    return getTeams(params.id, controller)
  })

  const gameResource = useResource$<Game>(({ cleanup }) => {
    const controller = new AbortController()
    cleanup(() => controller.abort())

    return getGame(params.id, controller)
  })

  return (
    <article class="page-content">
      <div class="teams__container">
        <Resource
          value={gameResource}
          onPending={() => <>Loading...</>}
          onRejected={(error) => <>Error: {error.message}</>}
          onResolved={(game) => {
            const TeamTile = getTeamTile(game.name)

            return (
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
            )
          }}
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
    `http://159.69.196.31/api/collections/teams/records?filter=(game="${gameId}")`,
    {
      signal: controller?.signal,
    }
  )

  return response.json()
}

export async function getGame(
  gameId: string,
  controller?: AbortController
): Promise<Game> {
  const response = await fetch(
    `http://159.69.196.31/api/collections/games/records/${gameId}`,
    {
      signal: controller?.signal,
    }
  )

  return response.json()
}
