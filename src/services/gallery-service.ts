import { Collection } from '~/types/pocketbase'
import pb from './pocketbase'
import type { Gallery } from '~/types/gallery'

export async function getGalleriesByCreator(creator: string) {
  return pb.collection(Collection.GALLERIES).getFullList<Gallery>({
    filter: `creator="${creator}"`,
  })
}

export async function getGalleries(page: number, perPage: number) {
  return pb.collection(Collection.GALLERIES).getList<Gallery>(page, perPage, {
    filter: 'hidden=false',
  })
}

export async function getGallery(id: string) {
  return pb.collection(Collection.GALLERIES).getOne<Gallery>(id)
}

export async function createGallery(values: FormData) {
  return pb.collection(Collection.GALLERIES).create<Gallery>(values)
}

export async function updateGallery(id: string, value: FormData) {
  return pb.collection(Collection.GALLERIES).update<Gallery>(id, value)
}

export async function deleteGallery(id: string) {
  return pb.collection(Collection.GALLERIES).delete(id)
}
