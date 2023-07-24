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
import { AuthContext } from '~/contexts/AuthContext'
import type { NewsEntry } from '~/types'
import { Collection } from '~/types'
import styles from '~/css/news/news-manager.css?inline'
import dayjs from 'dayjs'

export default component$(() => {
  useStyles$(styles)
  const { pocketbase, authenticated, authUser } = useContext(AuthContext)

  const newsResource = useResource$<NewsEntry[]>(async ({ track }) => {
    track(() => authenticated.value)
    const qrlPb = await pocketbase()
    if (!authUser.value) return []

    const response: NewsEntry[] = await qrlPb
      .collection(Collection.NEWS)
      .getFullList({
        filter: `author="${authUser.value.id}"`,
        sort: '-publishDate',
      })

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
