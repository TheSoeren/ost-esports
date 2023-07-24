import {
  component$,
  Resource,
  useResource$,
  useStylesScoped$,
} from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { Collection, type NewsEntry } from '~/types'
import NewsTile from '~/components/news/news-tile'
import styles from '~/css/news/index.css?inline'
import Pagination from '~/components/elements/pagination'
import usePagination from '~/hooks/usePagination'
import type { ListResult } from 'pocketbase'
import NewsListSkeleton from '~/components/news/news-list-skeleton'
import usePocketbase from '~/hooks/usePocketbase'

export default component$(() => {
  useStylesScoped$(styles)
  const pb = usePocketbase()

  const pagination = usePagination(1, 30)
  const newsResource = useResource$<ListResult<NewsEntry>>(
    async ({ track }) => {
      track(() => pagination.page.value)

      const response = await pb
        .collection(Collection.NEWS)
        .getList<NewsEntry>(pagination.page.value, pagination.perPage.value, {
          sort: '-publishDate',
          filter: 'hidden=false && publishDate <= @now',
        })
      pagination.setTotalPages$(response.totalPages)

      return structuredClone(response)
    }
  )

  return (
    <article>
      <Pagination {...pagination} />
      <Resource
        value={newsResource}
        onPending={() => <NewsListSkeleton />}
        onRejected={(error) => <>Error: {error.message}</>}
        onResolved={(news) => (
          <div
            class={[
              'news__container',
              pagination.totalPages.value > 1 && 'my-5',
            ]}
          >
            {news.items.map((newsEntry) => (
              <NewsTile key={newsEntry.id} {...newsEntry} />
            ))}
          </div>
        )}
      />
      <Pagination {...pagination} />
    </article>
  )
})

export const head: DocumentHead = {
  title: 'OST eSports - News',
}
