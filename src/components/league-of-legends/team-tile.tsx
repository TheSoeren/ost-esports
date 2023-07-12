import { Resource, component$, useResource$ } from '@builder.io/qwik'
import type { ListResult, Player, Team } from '~/types'
import PlayerInfo from './player-info'
import fetch from '~/ajax'

export default component$(({ id, name }: Team) => {
  const playerResource = useResource$<ListResult<Player>>(({ cleanup }) => {
    const controller = new AbortController()
    cleanup(() => controller.abort())

    return getPlayers(controller, id)
  })

  return (
    <div class="teams__tile">
      <div>{name}</div>

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

export async function getPlayers(
  controller?: AbortController,
  teamId?: string
): Promise<ListResult<Player>> {
  const response = await fetch(
    `/api/collections/memberhip/records?filter=(team="${teamId}")`,
    {
      signal: controller?.signal,
    }
  )

  return response.json()
}
