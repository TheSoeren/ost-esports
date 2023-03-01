import { component$, useStylesScoped$ } from '@builder.io/qwik'
import GameTile from '~/components/teams/game-tile'
import styles from '~/css/teams.css?inline'
import games from '~/data/games'

export default component$(() => {
  useStylesScoped$(styles)

  return (
    <article class="page-content">
      <div class="games__container">
        {games.map((game) => (
          <GameTile {...game} />
        ))}
      </div>
    </article>
  )
})
