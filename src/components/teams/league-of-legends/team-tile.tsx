import {
  Resource,
  component$,
  useResource$,
  useStylesScoped$,
} from '@builder.io/qwik'
import type { ListResult, Player, Team } from '~/types'
import PlayerInfo from '~/components/teams/league-of-legends/player-info'
import { getPlayers } from '~/data/teams/data-fetching'
import styles from '~/css/teams/team-tile.css?inline'

export default component$(({ id, name }: Team) => {
  useStylesScoped$(styles)

  const playerResource = useResource$<ListResult<Player>>(({ cleanup }) => {
    const controller = new AbortController()
    cleanup(() => controller.abort())

    return getPlayers(id, controller)
  })

  return (
    <div class="teams__tile">
      <div class="teams__name">{name}</div>
      <Resource
        value={playerResource}
        onPending={() => <>Loading...</>}
        onRejected={(error) => <>Error: {error.message}</>}
        onResolved={(players) => (
          <div>
            {players.items.map((player, index) => (
              <PlayerInfo key={index} {...player} />
            ))}
          </div>
        )}
      />
    </div>
  )
})
