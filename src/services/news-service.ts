import { Collection } from '~/types/pocketbase'
import pb from './pocketbase'
import type { NewsEntry } from '~/types/news'
import type { NewsForm } from '~/components/news/news-form'

export async function getNews(page: number, perPage: number) {
  return pb.collection(Collection.NEWS).getList<NewsEntry>(page, perPage, {
    sort: '-publishDate',
    filter: 'hidden=false && publishDate <= @now',
  })
}

export async function getNewsByAuthor(author: string) {
  return pb.collection(Collection.NEWS).getFullList<NewsEntry>({
    filter: `author="${author}"`,
    sort: '-publishDate',
  })
}

export async function getLatestNewsEntry() {
  return pb.collection(Collection.NEWS).getFirstListItem<NewsEntry>('', {
    sort: '-publishDate',
  })
}

export async function getNewsEntry(id: string) {
  return pb.collection(Collection.NEWS).getOne<NewsEntry>(id)
}

export async function createNewsEntry(value: NewsForm) {
  return pb.collection(Collection.NEWS).create<NewsEntry>(value)
}

export async function updateNewsEntry(id: string, value: NewsForm) {
  return pb.collection(Collection.NEWS).update<NewsEntry>(id, value)
}

export async function deleteNewsEntry(id: string) {
  return pb.collection(Collection.NEWS).delete(id)
}
