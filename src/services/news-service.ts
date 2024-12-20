import { Collection } from '~/types/pocketbase'
import type { NewsEntry } from '~/types/news'
import type { NewsFormSchema } from '~/components/news/news-form'
import clientPb from '~/data/pocketbase'

export async function getNews(page: number, perPage: number, pb = clientPb) {
  return pb.collection(Collection.NEWS).getList<NewsEntry>(page, perPage, {
    sort: '-publishDate',
    filter: 'hidden=false && publishDate <= @now',
  })
}

export async function getNewsByAuthor(author: string, pb = clientPb) {
  return pb.collection(Collection.NEWS).getFullList<NewsEntry>({
    filter: `author="${author}"`,
    sort: '-publishDate',
  })
}

export async function getLatestNewsEntry(pb = clientPb) {
  return pb.collection(Collection.NEWS).getFirstListItem<NewsEntry>('', {
    sort: '-publishDate',
  })
}

export async function getNewsEntry(id: string, pb = clientPb) {
  return pb.collection(Collection.NEWS).getOne<NewsEntry>(id)
}

export async function createNewsEntry(value: NewsFormSchema, pb = clientPb) {
  return pb.collection(Collection.NEWS).create<NewsEntry>(value)
}

export async function updateNewsEntry(
  id: string,
  value: NewsFormSchema,
  pb = clientPb
) {
  return pb.collection(Collection.NEWS).update<NewsEntry>(id, value)
}

export async function deleteNewsEntry(id: string, pb = clientPb) {
  return pb.collection(Collection.NEWS).delete(id)
}
