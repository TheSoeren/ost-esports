import {
  Resource,
  component$,
  useResource$,
  useStylesScoped$,
} from '@builder.io/qwik'
import { useLocation } from '@builder.io/qwik-city'
import type { ListResult } from 'pocketbase'
import type { GalleryImage } from '~/types'
import pb from '~/pocketbase'
import BackButton from '~/components/elements/back-button'
import styles from '~/css/gallery/gallery-images.css?inline'
import usePagination from '~/hooks/usePagination'
import Pagination from '~/components/elements/pagination'

export default component$(() => {
  useStylesScoped$(styles)

  const pagination = usePagination(1, 30)
  const { params } = useLocation()
  const imagesResource = useResource$<ListResult<GalleryImage>>(
    async ({ track }) => {
      track(() => pagination.page.value)

      const response = await pb
        .collection('gallery_images')
        .getList<GalleryImage>(
          pagination.page.value,
          pagination.perPage.value,
          {
            filter: `gallery="${params.id}"`,
          }
        )

      pagination.setTotalPages(response.totalPages)

      return structuredClone(response)
    }
  )

  return (
    <article>
      <BackButton href="/gallery" label="Galerie Auswahl" />
      <Pagination {...pagination} />
      <div class="gallery-images__container">
        <Resource
          value={imagesResource}
          onResolved={(galleryImages) => (
            <>
              {galleryImages.items.map((galleryImage) => (
                <img
                  key={galleryImage.id}
                  alt={galleryImage.image}
                  class="gallery-images__image"
                  src={pb.files.getUrl(galleryImage, galleryImage.image)}
                />
              ))}
            </>
          )}
        />
      </div>
      <Pagination {...pagination} />
    </article>
  )
})
