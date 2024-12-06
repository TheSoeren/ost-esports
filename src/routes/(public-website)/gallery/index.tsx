import {
  Resource,
  component$,
  useResource$,
  useStylesScoped$,
} from '@builder.io/qwik'
import { type DocumentHead } from '@builder.io/qwik-city'
import styles from '~/css/gallery/index.css?inline'
import GalleryTile from '~/components/gallery/gallery-tile'
import GalleryTileSkeleton from '~/components/gallery/gallery-tile-skeleton'
import usePagination from '~/hooks/use-pagination'
import Pagination from '~/components/elements/pagination'
import { getGalleries } from '~/services/gallery-service'

export default component$(() => {
  useStylesScoped$(styles)
  const pagination = usePagination(1, 30)

  const galleriesResource = useResource$(async ({ track }) => {
    track(() => pagination.page.value)

    const response = await getGalleries(pagination)
    pagination.setTotalPages$(response.totalPages)
    return response
  })

  return (
    <article>
      <Pagination {...pagination} />
      <Resource
        value={galleriesResource}
        onPending={() => <GalleryTileSkeleton />}
        onResolved={(galleries) => (
          <div class="gallery__container">
            {galleries.items.map((gallery) => (
              <GalleryTile key={gallery.id} {...gallery} />
            ))}
          </div>
        )}
      />
      <Pagination {...pagination} />
    </article>
  )
})

export const head: DocumentHead = {
  title: 'OST eSports - Gallerie',
}
