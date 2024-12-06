import { component$, useStyles$ } from '@builder.io/qwik'
import { Link, routeLoader$, type DocumentHead } from '@builder.io/qwik-city'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from 'qwik-fontawesome'
import styles from '~/css/news/news-manager.css?inline'
import dayjs from 'dayjs'
import { getNewsByAuthor } from '~/services/news-service'
import pb from '~/services/pocketbase'
import type { NewsEntry } from '~/types'

export const useNews = routeLoader$<NewsEntry[]>(async () => {
  const authRecord = pb.authStore.record
  if (!authRecord) {
    return []
  }

  return getNewsByAuthor(authRecord.id)
})

export default component$(() => {
  useStyles$(styles)
  const news = useNews()

  return (
    <section>
      <h1 class="dashboard-title">News Manager</h1>
      <div class="news-manager">
        <Link class="btn-outline news-manager__add" href="create">
          <FaIcon icon={faPlus} />
        </Link>

        {news.value.map((news) => (
          <Link class="tile cursor-pointer" href={news.id} key={news.id}>
            <h2 class="news-manager__title">{news.title}</h2>
            <h2 class="news-manager__publish-date">
              {dayjs(news.publishDate).format('DD.MM.YYYY HH:mm')}
            </h2>
          </Link>
        ))}
      </div>
    </section>
  )
})

export const head: DocumentHead = {
  title: 'Dashboard | News Manager',
}
