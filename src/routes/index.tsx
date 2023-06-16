import {
  Resource,
  component$,
  noSerialize,
  useResource$,
} from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import NewsTile from '~/components/news/news-tile'
import pb from '~/pocketbase'
import type { NewsEntry } from '~/types'

export default component$(() => {
  const newsResource = useResource$<NewsEntry>(async () => {
    const response = await getNews()
    noSerialize(response)
    return response
  })

  return (
    <article>
      <Resource
        value={newsResource}
        onPending={() => <>Loading...</>}
        onRejected={(error) => <>Error: {error.message}</>}
        onResolved={(news) => <NewsTile {...news} />}
      />
    </article>
  )
})

export async function getNews() {
  return pb.collection('news').getFirstListItem<NewsEntry>('')
}

export const head: DocumentHead = {
  title: 'OST eSports',
}
