import { $, component$, useSignal, useStylesScoped$ } from '@builder.io/qwik'
import { DocumentHead, routeLoader$ } from '@builder.io/qwik-city'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import BackButton from '~/components/elements/back-button'
import IconButton from '~/components/elements/icon-button'
import Modal from '~/components/elements/modal'
import styles from '~/css/gallery/gallery-images.css?inline'
import { getGallery } from '~/services/gallery-service'
import pb from '~/services/pocketbase'

export const useGallery = routeLoader$(async ({ params }) => {
  return getGallery(params.id)
})

export default component$(() => {
  useStylesScoped$(styles)

  const gallery = useGallery()
  const images = gallery.value.images

  const modalImage = useSignal(0)
  const setModalImage = $((value: number) => {
    modalImage.value = value % images.length
  })

  const getPreviewImageUrl = (image: string) => {
    return pb.files.getURL(gallery.value, image, { thumb: '300x300' })
  }

  const getImageUrl = (image: string) => {
    return pb.files.getURL(gallery.value, image)
  }

  return (
    <article>
      <BackButton href="/gallery" label="Galerie Auswahl" />
      <div class="gallery-images__container">
        {images.map((galleryImage, index) => (
          <img
            width={300}
            height={300}
            key={galleryImage}
            alt={galleryImage}
            class="gallery-images__image"
            src={getPreviewImageUrl(galleryImage)}
            onClick$={() => setModalImage(index)}
            data-hs-overlay="#lightbox"
          />
        ))}
        <Modal id="lightbox">
          <div class="flex justify-around">
            <IconButton
              icon={faAngleLeft}
              class="w-full rounded-none rounded-tl"
              onClick$={() => setModalImage(modalImage.value - 1)}
            />
            <IconButton
              icon={faAngleRight}
              class="w-full rounded-none rounded-tr"
              onClick$={() => setModalImage(modalImage.value + 1)}
            />
          </div>
          <img
            alt={images[modalImage.value]}
            src={getImageUrl(images[modalImage.value])}
            class="max-h-screen"
          />
        </Modal>
      </div>
    </article>
  )
})

export const head: DocumentHead = ({ resolveValue }) => {
  const gallery = resolveValue(useGallery)

  return {
    title: gallery.name,
    meta: [
      {
        name: 'id',
        content: gallery.id,
      },
    ],
  }
}
