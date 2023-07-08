import {
  Resource,
  component$,
  useResource$,
  useStyles$,
} from '@builder.io/qwik'
import { useLocation } from '@builder.io/qwik-city'
import BackButton from '~/components/elements/back-button'
import type { NewsEntry } from '~/types'
import styles from '~/css/news/news-detail.css?inline'
import NewsEntrySkeleton from '~/components/news/news-entry-skeleton'
import usePocketbase from '~/hooks/usePocketBase'

export default component$(() => {
  useStyles$(styles)
  const pb = usePocketbase()

  const { params } = useLocation()
  const newsResource = useResource$<NewsEntry>(async () => {
    const response = await pb.collection('news').getOne<NewsEntry>(params.id)

    return structuredClone(response)
  })

  return (
    <article>
      <BackButton href="/news" label="Zur Übersicht" />
      <Resource
        value={newsResource}
        onPending={() => <NewsEntrySkeleton />}
        onRejected={(error) => <>Error: {error.message}</>}
        onResolved={({ title, content, teaser }) => (
          <section class="news-detail">
            <h1 class="news-detail__title">{title}</h1>
            <hr />
            <p class="pb-4">
              <em>{teaser}</em>
            </p>
            {/* We can do `dangerouslySetInnerHTML` here because the content is sanitized by pocketbase */}
            <div
              class="news-detail__content prose"
              dangerouslySetInnerHTML={content}
            ></div>
          </section>
        )}
      />
    </article>
  )
})
