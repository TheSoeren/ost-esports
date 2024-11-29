import { Collection } from '~/types/pocketbase'
import pb from './pocketbase'
import type { Gallery } from '~/types/gallery'
import type { PaginationReturn } from '~/hooks/use-pagination'

export async function getGalleriesByCreator(creator: string) {
  return pb.collection(Collection.GALLERIES).getFullList<Gallery>({
    filter: `creator="${creator}"`,
  })
}

export async function getGalleries(pagination: PaginationReturn) {
  return pb
    .collection(Collection.GALLERIES)
    .getList<Gallery>(pagination.page.value, pagination.perPage.value, {
      filter: 'hidden=false',
    })
}

export async function getGalleryById(id: string) {
  return pb.collection(Collection.GALLERIES).getOne<Gallery>(id)
}

export async function createGallery(values: FormData) {
  return pb.collection(Collection.GALLERIES).create(values)
}

export async function updateGalleryById(id: string, value: FormData) {
  return pb.collection(Collection.GALLERIES).update(id, value)
}

export async function deleteGalleryById(id: string) {
  return pb.collection(Collection.GALLERIES).delete(id)
}
