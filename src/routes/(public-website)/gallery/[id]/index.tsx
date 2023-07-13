import {
  Resource,
  component$,
  useResource$,
  useSignal,
  useStylesScoped$,
} from '@builder.io/qwik'
import { useLocation } from '@builder.io/qwik-city'
import type { ListResult } from 'pocketbase'
import { Collection, type GalleryImage } from '~/types'
import BackButton from '~/components/elements/back-button'
import styles from '~/css/gallery/gallery-images.css?inline'
import usePagination from '~/hooks/usePagination'
import Pagination from '~/components/elements/pagination'
import GalleryListSkeleton from '~/components/gallery/gallery-list-skeleton'
import Modal from '~/components/elements/modal'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import IconButton from '~/components/elements/icon-button'
import usePocketbase from '~/hooks/usePocketbase'

export function circularSubtract(value: number, length: number) {
  return (value + length - 1) % length
}

export function circularAdd(value: number, length: number) {
  return (value + 1) % length
}

export default component$(() => {
  useStylesScoped$(styles)
  const pb = usePocketbase()

  const pagination = usePagination(1, 30)
  const { params } = useLocation()
  const modalImage = useSignal(0)
  const imagesResource = useResource$<ListResult<GalleryImage>>(
    async ({ track }) => {
      track(() => pagination.page.value)

      const response = await pb
        .collection(Collection.GALLERY_IMAGES)
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
      <Resource
        value={imagesResource}
        onPending={() => <GalleryListSkeleton />}
        onResolved={(galleryImages) => (
          <div class="gallery-images__container">
            {galleryImages.items.map((galleryImage, index) => (
              <img
                key={galleryImage.id}
                alt={galleryImage.image}
                class="gallery-images__image"
                src={pb.files.getUrl(galleryImage, galleryImage.image)}
                onClick$={() => (modalImage.value = index)}
                data-hs-overlay="#lightbox"
              />
            ))}
            <Modal id="lightbox">
              <div class="flex justify-around">
                <IconButton
                  icon={faAngleLeft}
                  class="w-full rounded-none rounded-tl"
                  onClick$={() => {
                    modalImage.value = circularSubtract(
                      modalImage.value,
                      galleryImages.items.length
                    )
                  }}
                />
                <IconButton
                  icon={faAngleRight}
                  class="w-full rounded-none rounded-tr"
                  onClick$={() => {
                    modalImage.value = circularAdd(
                      modalImage.value,
                      galleryImages.items.length
                    )
                  }}
                />
              </div>
              <img
                alt={galleryImages.items[modalImage.value].image}
                src={pb.files.getUrl(
                  galleryImages.items[modalImage.value],
                  galleryImages.items[modalImage.value].image
                )}
                class="max-h-screen"
              />
            </Modal>
          </div>
        )}
      />
      <Pagination {...pagination} />
    </article>
  )
})
