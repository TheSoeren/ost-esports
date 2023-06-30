import {
  component$,
  Resource,
  useResource$,
  useStylesScoped$,
} from '@builder.io/qwik'
import GameTile from '~/components/games/game-tile'
import styles from '~/css/games/index.css?inline'
import type { Game } from '~/types'
import { type DocumentHead } from '@builder.io/qwik-city'
import pb from '~/pocketbase'
import type { ListResult } from 'pocketbase'

export default component$(() => {
  useStylesScoped$(styles)

  const gamesResource = useResource$<ListResult<Game>>(async () => {
    const response = await pb.collection('games').getList<Game>(1, 30)

    return structuredClone(response)
  })

  return (
    <article>
      <Resource
        value={gamesResource}
        onPending={() => <>Loading...</>}
        onRejected={(error) => <>Error: {error.message}</>}
        onResolved={(games) => (
          <div class="games__container">
            {games.items.map((game) => (
              // @ts-expect-error
              <GameTile key={game.id} {...game} />
            ))}
          </div>
        )}
      />
    </article>
  )
})

export const head: DocumentHead = {
  title: 'OST eSports - Games',
}
