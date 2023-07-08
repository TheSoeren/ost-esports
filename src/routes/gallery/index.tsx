import {
  Resource,
  component$,
  useResource$,
  useStylesScoped$,
} from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import type { ListResult } from 'pocketbase'
import type { Gallery } from '~/types/gallery'
import styles from '~/css/gallery/index.css?inline'
import GalleryTile from '~/components/gallery/gallery-tile'
import GalleryTileSkeleton from '~/components/gallery/gallery-tile-skeleton'
import usePocketbase from '~/hooks/usePocketbase'
import usePagination from '~/hooks/usePagination'
import Pagination from '~/components/elements/pagination'

export default component$(() => {
  useStylesScoped$(styles)
  const pb = usePocketbase()
  const pagination = usePagination(1, 30)

  const teamsResource = useResource$<ListResult<Gallery>>(async () => {
    const response = await pb
      .collection('galleries')
      .getList<Gallery>(pagination.page.value, pagination.perPage.value)
    pagination.setTotalPages(response.totalPages)

    return structuredClone(response)
  })

  return (
    <article>
      <Pagination {...pagination} />
      <Resource
        value={teamsResource}
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
