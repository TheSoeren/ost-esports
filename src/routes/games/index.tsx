import {
  component$,
  Resource,
  useResource$,
  useStyles$,
} from '@builder.io/qwik'
import GameTile from '~/components/games/game-tile'
import styles from '~/css/games.css?inline'
import type { Game, ListResult } from '~/types'
import fetch from '~/ajax'
import { type DocumentHead } from '@builder.io/qwik-city'

export default component$(() => {
  useStyles$(styles)

  const gamesResource = useResource$<ListResult<Game>>(({ cleanup }) => {
    const controller = new AbortController()
    cleanup(() => controller.abort())

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
  const response = await fetch(`/api/collections/games/records`, {
    signal: controller?.signal,
  })

  return response.json()
}

export const head: DocumentHead = {
  title: 'OST Games',
}
