import { component$, useStylesScoped$ } from '@builder.io/qwik'
import type { NewsEntry } from '~/types'
import styles from '~/css/news/news-tile.css?inline'

export default component$(({ title, content }: NewsEntry) => {
  useStylesScoped$(styles)

  return (
    <div class="news-tile">
      <div class="news-tile__title">{title}</div>
      <hr />
      {/* We can do `dangerouslySetInnerHTML` here because the content is sanitized by pocketbase */}
      <div class="prose" dangerouslySetInnerHTML={content}></div>
    </div>
  )
})
