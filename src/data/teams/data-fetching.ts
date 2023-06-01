import type { ListResult, User } from '~/types/pocketbase'
import type { Player } from '~/types/teams'
import fetch from '~/ajax'

export async function getPlayers(
  teamId: string,
  controller?: AbortController
): Promise<ListResult<Player>> {
  const response = await fetch(
    `/api/collections/membership/records?filter=(team="${teamId}")`,
    {
      signal: controller?.signal,
    }
  )

  return response.json()
}

export async function getUser(
  id: string,
  controller?: AbortController
): Promise<User> {
  const response = await fetch(`/api/collections/users/records/${id}`, {
    signal: controller?.signal,
  })

  return response.json()
}
