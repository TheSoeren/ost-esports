import { component$, useStylesScoped$ } from '@builder.io/qwik'
import type { NewsEntry } from '~/types'
import styles from '~/css/news/news-tile.css?inline'
import { Link } from '@builder.io/qwik-city'

export default component$(({ id, title, teaser }: NewsEntry) => {
  useStylesScoped$(styles)

  return (
    <section class="tile news-tile">
      <div class="news-tile__header">
        <h2 class="news-tile__title">{title}</h2>
        <Link href={'/news/' + id} class="btn-outline news-tile__link">
          Weiterlesen
        </Link>
      </div>
      <div class="news-tile__teaser">{teaser}</div>
    </section>
  )
})
