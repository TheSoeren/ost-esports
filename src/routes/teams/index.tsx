import { component$, useStyles$ } from '@builder.io/qwik'
import GameTile from '~/components/teams/game-tile'
import styles from '~/css/teams.css?inline'
import games from '~/data/games'

export default component$(() => {
  useStyles$(styles)

  return (
    <article class="page-content">
      <div class="games__container">
        {games.map((game, index) => (
          <GameTile key={index} {...game} />
        ))}
      </div>
    </article>
  )
})
