import { Resource, component$, useResource$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import NewsTile from '~/components/news/news-tile'
import NewsTileSkeleton from '~/components/news/news-tile-skeleton'
import pb from '~/pocketbase'
import type { NewsEntry } from '~/types'

export default component$(() => {
  const newsResource = useResource$<NewsEntry>(async () => {
    const response = await pb.collection('news').getFirstListItem<NewsEntry>('')

    return structuredClone(response)
  })

  return (
    <article>
      <Resource
        value={newsResource}
        onPending={() => <NewsTileSkeleton />}
        onRejected={(error) => <>Error: {error.message}</>}
        onResolved={(news) => <NewsTile {...news} />}
      />
    </article>
  )
})

export const head: DocumentHead = {
  title: 'OST eSports',
}
