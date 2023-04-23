import { Resource, component$, useResource$ } from '@builder.io/qwik'
import type { ListResult, Player, Team } from '~/types'
import fetch from '~/ajax'
import { useLocation } from '@builder.io/qwik-city'
import getPlayerInfo from '~/data/player-info-mapping'

export default component$(({ id, name }: Team) => {
  const { params } = useLocation()
  const PlayerInfo = getPlayerInfo(params.id)

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

export async function getPlayers(
  teamId: string,
  controller?: AbortController
): Promise<ListResult<Player>> {
  const response = await fetch(
    `/api/collections/memberhip/records?filter=(team="${teamId}")`,
    {
      signal: controller?.signal,
    }
  )

  return response.json()
}
