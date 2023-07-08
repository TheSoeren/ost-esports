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
import GameTileSkeleton from '~/components/games/game-tile-skeleton'
import usePocketbase from '~/hooks/usePocketBase'

export default component$(() => {
  useStylesScoped$(styles)
  const pb = usePocketbase()

  const gamesResource = useResource$<Game[]>(async () => {
    const response: Game[] = await pb.collection('games').getFullList()

    return structuredClone(response)
  })

  return (
    <article>
      <Resource
        value={gamesResource}
        onPending={() => <GameTileSkeleton />}
        onRejected={(error) => <>Error: {error.message}</>}
        onResolved={(games) => (
          <div class="games__container">
            {games.map((game) => (
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
