import { component$, useStylesScoped$ } from '@builder.io/qwik'
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city'
import type { NewsEntry } from '~/types'
import NewsTile from '~/components/news/news-tile'
import styles from '~/css/news/index.css?inline'
import Pagination from '~/components/elements/pagination'
import type { ListResult } from 'pocketbase'
import { getNews } from '~/services/news-service'

export const useNews = routeLoader$<ListResult<NewsEntry>>(({ query }) => {
  const page = Number(query.get('page')) || 1
  const perPage = Number(query.get('perPage')) || 30

  return getNews(page, perPage)
})

export default component$(() => {
  useStylesScoped$(styles)

  const news = useNews()

  return (
    <article>
      <Pagination {...news.value} />
      <div class={['news__container', news.value.totalPages > 1 && 'my-5']}>
        {news.value.items.map((newsEntry) => (
          <NewsTile key={newsEntry.id} {...newsEntry} />
        ))}
      </div>
      <Pagination {...news.value} />
    </article>
  )
})

export const head: DocumentHead = {
  title: 'OST eSports - News',
}
