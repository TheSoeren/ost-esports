import {
  Resource,
  component$,
  useContext,
  useResource$,
  useStyles$,
} from '@builder.io/qwik'
import { Link, type DocumentHead } from '@builder.io/qwik-city'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from 'qwik-fontawesome'
import DataManagerSkeleton from '~/components/elements/data-manager-skeleton'
import { AuthContext } from '~/contexts/auth-context'
import type { NewsEntry } from '~/types'
import styles from '~/css/news/news-manager.css?inline'
import dayjs from 'dayjs'
import { getNewsByAuthor } from '~/services/news-service'

export default component$(() => {
  useStyles$(styles)
  const { authenticated, authUser } = useContext(AuthContext)

  const newsResource = useResource$<NewsEntry[]>(async ({ track }) => {
    track(() => authenticated.value)
    if (!authUser.value) {
      return []
    }

    const response = await getNewsByAuthor(authUser.value.id)
    return structuredClone(response)
  })

  return (
    <section>
      <h1 class="dashboard-title">News Manager</h1>
      <div class="news-manager">
        <Link class="btn-outline news-manager__add" href="create">
          <FaIcon icon={faPlus} />
        </Link>

        <Resource
          value={newsResource}
          onPending={() => <DataManagerSkeleton />}
          onRejected={(error) => <>Error: {error.message}</>}
          onResolved={(newsEntries) => (
            <>
              {newsEntries.map((news) => (
                <Link class="tile cursor-pointer" href={news.id} key={news.id}>
                  <h2 class="news-manager__title">{news.title}</h2>
                  <h2 class="news-manager__publish-date">
                    {dayjs(news.publishDate).format('DD.MM.YYYY HH:mm')}
                  </h2>
                </Link>
              ))}
            </>
          )}
        />
      </div>
    </section>
  )
})

export const head: DocumentHead = {
  title: 'Dashboard | News Manager',
}
