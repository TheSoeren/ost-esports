import { Collection } from '~/types/pocketbase'
import pb from './pocketbase'
import type { Game } from '~/types'

export async function getGames() {
  return pb.collection(Collection.GAMES).getFullList<Game>()
}

export async function getVisibleGames() {
  return pb.collection(Collection.GAMES).getFullList<Game>({
    filter: `hidden=false`,
  })
}
