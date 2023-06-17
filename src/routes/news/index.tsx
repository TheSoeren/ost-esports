import {
  component$,
  noSerialize,
  Resource,
  useResource$,
  useStylesScoped$,
} from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import type { ListResult, NewsEntry } from '~/types'
import NewsTile from '~/components/news/news-tile'
import styles from '~/css/news/index.css?inline'
import pb from '~/pocketbase'

export default component$(() => {
  useStylesScoped$(styles)

  const newsResource = useResource$<ListResult<NewsEntry>>(async () => {
    const response = await pb.collection('news').getList<NewsEntry>(1, 30)
    noSerialize(response)
    return response
  })

  return (
    <article>
      <Resource
        value={newsResource}
        onPending={() => <>Loading...</>}
        onRejected={(error) => <>Error: {error.message}</>}
        onResolved={(news) => (
          <div class="news__container">
            {news.items.map((newsEntry) => (
              <NewsTile key={newsEntry.id} {...newsEntry} />
            ))}
          </div>
        )}
      />
    </article>
  )
})

export const head: DocumentHead = {
  title: 'OST eSports - News',
}
