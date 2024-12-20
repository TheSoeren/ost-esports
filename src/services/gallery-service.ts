import { Collection } from '~/types/pocketbase'
import type { Gallery } from '~/types/gallery'
import clientPb from '~/data/pocketbase'

export async function getGalleriesByCreator(creator: string, pb = clientPb) {
  return pb.collection(Collection.GALLERIES).getFullList<Gallery>({
    filter: `creator="${creator}"`,
  })
}

export async function getGalleries(
  page: number,
  perPage: number,
  pb = clientPb
) {
  return pb.collection(Collection.GALLERIES).getList<Gallery>(page, perPage, {
    filter: 'hidden=false',
  })
}

export async function getGallery(id: string, pb = clientPb) {
  return pb.collection(Collection.GALLERIES).getOne<Gallery>(id)
}

export async function createGallery(values: FormData, pb = clientPb) {
  return pb.collection(Collection.GALLERIES).create<Gallery>(values)
}

export async function updateGallery(
  id: string,
  value: FormData,
  pb = clientPb
) {
  return pb.collection(Collection.GALLERIES).update<Gallery>(id, value)
}

export async function deleteGallery(id: string, pb = clientPb) {
  return pb.collection(Collection.GALLERIES).delete(id)
}
