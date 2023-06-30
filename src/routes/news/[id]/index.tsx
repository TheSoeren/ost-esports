import {
  Resource,
  component$,
  useResource$,
  useStyles$,
} from '@builder.io/qwik'
import { useLocation } from '@builder.io/qwik-city'
import BackButton from '~/components/elements/back-button'
import pb from '~/pocketbase'
import type { NewsEntry } from '~/types'
import styles from '~/css/news/news-detail.css?inline'

export default component$(() => {
  useStyles$(styles)

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
        onPending={() => <>Loading...</>}
        onRejected={(error) => <>Error: {error.message}</>}
        onResolved={({ title, content, teaser }) => (
          <section class="news-detail">
            <div class="news-detail__title">{title}</div>
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
