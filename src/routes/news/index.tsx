import {
  component$,
  noSerialize,
  Resource,
  useResource$,
} from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import type { ListResult, NewsEntry } from '~/types'
import NewsTile from '~/components/news/news-tile'
import pb from '~/pocketbase'

export default component$(() => {
  const newsResource = useResource$<ListResult<NewsEntry>>(async () => {
    const response = await getNews()
    noSerialize(response)
    return response
  })

  return (
    <article class="page-content">
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

export async function getNews() {
  return pb.collection('news').getList<NewsEntry>(1, 30)
}

export const head: DocumentHead = {
  title: 'OST News',
}
