import {
  component$,
  noSerialize,
  Resource,
  useResource$,
  useStyles$,
} from '@builder.io/qwik'
import GameTile from '~/components/games/game-tile'
import styles from '~/css/games.css?inline'
import type { Game, ListResult } from '~/types'
import { type DocumentHead } from '@builder.io/qwik-city'
import pb from '~/pocketbase'

export default component$(() => {
  useStyles$(styles)

  const gamesResource = useResource$<ListResult<Game>>(async () => {
    const response = await getGames()
    noSerialize(response)
    return response
  })

  return (
    <article class="page-content">
      <Resource
        value={gamesResource}
        onPending={() => <>Loading...</>}
        onRejected={(error) => <>Error: {error.message}</>}
        onResolved={(games) => (
          <div class="games__container">
            {games.items.map((game) => (
              <GameTile key={game.id} {...game} />
            ))}
          </div>
        )}
      />
    </article>
  )
})

export async function getGames() {
  return pb.collection('games').getList<Game>(1, 30)
}

export const head: DocumentHead = {
  title: 'OST Games',
}
