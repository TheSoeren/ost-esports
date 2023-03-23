import {
  component$,
  Resource,
  useResource$,
  useStyles$,
} from '@builder.io/qwik'
import GameTile from '~/components/teams/game-tile'
import styles from '~/css/teams.css?inline'
import type { Game, ListResult } from '~/types'

export default component$(() => {
  useStyles$(styles)

  const gamesResource = useResource$<ListResult<Game>>(({ cleanup }) => {
    const controller = new AbortController()
    cleanup(() => controller.abort())

    // Fetch the data and return the promises.
    return getGames(controller)
  })

  return (
    <article class="page-content">
      <Resource
        value={gamesResource}
        onPending={() => <>Loading...</>}
        onRejected={(error) => <>Error: {error.message}</>}
        onResolved={(games) => (
          <div class="games__container">
            {games.items.map((game, index) => (
              <GameTile key={index} {...game} />
            ))}
          </div>
        )}
      />
    </article>
  )
})

export async function getGames(
  controller?: AbortController
): Promise<ListResult<Game>> {
  const response = await fetch(
    `http://159.69.196.31/api/collections/games/records`,
    {
      signal: controller?.signal,
    }
  )

  return await response.json()
}
