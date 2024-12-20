import { Collection } from '~/types/pocketbase'
import type { Game } from '~/types'
import clientPb from '~/data/pocketbase'

export async function getGames(pb = clientPb) {
  return pb.collection(Collection.GAMES).getFullList<Game>()
}

export async function getGame(id: string, pb = clientPb) {
  return pb.collection(Collection.GAMES).getOne<Game>(id)
}

export async function getVisibleGames(pb = clientPb) {
  return pb.collection(Collection.GAMES).getFullList<Game>({
    filter: `hidden=false`,
  })
}
