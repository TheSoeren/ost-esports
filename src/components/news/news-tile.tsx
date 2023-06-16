import { component$, useStylesScoped$ } from '@builder.io/qwik'
import type { NewsEntry } from '~/types'
import styles from '~/css/news/news-tile.css?inline'
import { Link } from '@builder.io/qwik-city'

export default component$(({ id, title, teaser }: NewsEntry) => {
  useStylesScoped$(styles)

  return (
    <section class="news-tile">
      <div class="news-tile__header">
        <div class="news-tile__title">{title}</div>
        <Link href={'/news/' + id} class="btn-outline news__tile-link">
          Weiterlesen
        </Link>
      </div>
      <hr />
      <div>{teaser}</div>
    </section>
  )
})
