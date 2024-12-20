import { component$, useStylesScoped$ } from '@builder.io/qwik'
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city'
import styles from '~/css/gallery/index.css?inline'
import GalleryTile from '~/components/gallery/gallery-tile'
import Pagination from '~/components/elements/pagination'
import type { Gallery } from '~/types/gallery'
import type { ListResult } from 'pocketbase'
import { getEdgePbInstance } from '~/services/pocketbase-service'
import { getGalleries } from '~/services/gallery-service'

export const useGalleries = routeLoader$<ListResult<Gallery>>(
  ({ query, cookie }) => {
    const pb = getEdgePbInstance(cookie)
    const page = Number(query.get('page')) || 1
    const perPage = Number(query.get('perPage')) || 30
    return getGalleries(page, perPage, pb)
  }
)

export default component$(() => {
  useStylesScoped$(styles)

  const galleries = useGalleries()

  return (
    <article>
      <Pagination {...galleries.value} />
      <div class="gallery__container">
        {galleries.value.items.map((gallery) => (
          <GalleryTile key={gallery.id} {...gallery} />
        ))}
      </div>
      <Pagination {...galleries.value} />
    </article>
  )
})

export const head: DocumentHead = {
  title: 'Gallerie',
}
