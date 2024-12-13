import { component$, useStylesScoped$ } from '@builder.io/qwik'
import GameTile from '~/components/games/game-tile'
import styles from '~/css/games/index.css?inline'
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city'
import { getVisibleGames } from '~/services/games-service'

export const useGames = routeLoader$(async () => {
  return getVisibleGames()
})

export default component$(() => {
  useStylesScoped$(styles)
  const games = useGames()

  return (
    <article>
      <div class="games__container">
        {games.value.map((game) => (
          <GameTile key={game.id} {...game} />
        ))}
      </div>
    </article>
  )
})

export const head: DocumentHead = {
  title: 'Games',
}
