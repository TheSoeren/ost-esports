import { component$, useStylesScoped$ } from '@builder.io/qwik'
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city'
import styles from '~/css/gallery/index.css?inline'
import GalleryTile from '~/components/gallery/gallery-tile'
import Pagination from '~/components/elements/pagination'
import { getGalleries } from '~/services/gallery-service'
import type { Gallery } from '~/types/gallery'
import type { ListResult } from 'pocketbase'

export const useGalleries = routeLoader$<ListResult<Gallery>>(({ query }) => {
  const page = Number(query.get('page')) || 1
  const perPage = Number(query.get('perPage')) || 30

  return getGalleries(page, perPage)
})

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
  title: 'OST eSports - Gallerie',
}
