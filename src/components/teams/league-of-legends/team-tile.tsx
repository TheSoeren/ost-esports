import {
  Resource,
  component$,
  noSerialize,
  useResource$,
  useStylesScoped$,
} from '@builder.io/qwik'
import type { ListResult, Player, Team } from '~/types'
import PlayerInfo from '~/components/teams/league-of-legends/player-info'
import styles from '~/css/teams/team-tile.css?inline'
import pb from '~/pocketbase'

export default component$(({ id, name }: Team) => {
  useStylesScoped$(styles)

  const playerResource = useResource$<ListResult<Player>>(async () => {
    const response = await pb
      .collection('membership')
      .getList<Player>(1, 30, { filter: `team="${id}"`, $cancelKey: id })
    noSerialize(response)
    return response
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
            {players.items.map((player) => (
              <PlayerInfo key={player.id} {...player} />
            ))}
          </div>
        )}
      />
    </div>
  )
})
