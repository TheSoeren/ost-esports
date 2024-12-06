import { component$, useStyles$ } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import BackButton from '~/components/elements/back-button'
import styles from '~/css/news/news-detail.css?inline'
import { getNewsEntry } from '~/services/news-service'
import type { NewsEntry } from '~/types'

export const useNewsEntry = routeLoader$<NewsEntry>(async ({ params }) => {
  return getNewsEntry(params.id)
})

export default component$(() => {
  useStyles$(styles)

  const { value: newsEntry } = useNewsEntry()

  return (
    <article>
      <BackButton href="/news" label="Zur Übersicht" />
      <section class="news-detail">
        <h1 class="news-detail__title">{newsEntry.title}</h1>
        <hr />
        <p class="news-detail__teaser">
          <em>{newsEntry.teaser}</em>
        </p>
        {/* We can do `dangerouslySetInnerHTML` here because the content is sanitized by pocketbase */}
        <div
          class="prose news-detail__content"
          dangerouslySetInnerHTML={newsEntry.content}
        ></div>
      </section>
    </article>
  )
})
