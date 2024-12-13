import { $, component$, useSignal, useStylesScoped$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { routeLoader$ } from '@builder.io/qwik-city'
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

  const imageIndex = useSignal(0)
  const imageSource = useSignal('')

  const getPreviewImageUrl = (image: string) => {
    return pb.files.getURL(gallery.value, image, { thumb: '300x300' })
  }

  const getImageUrl = $((image: string) => {
    return pb.files.getURL(gallery.value, image)
  })

  const setModalImage = $(async (index: number) => {
    const circularIndex = (index + images.length) % images.length
    imageSource.value = await getImageUrl(images[circularIndex])
    imageIndex.value = circularIndex
  })

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
            data-hs-overlay="#gallery-lightbox"
          />
        ))}
      </div>

      <Modal id="gallery-lightbox">
        <div class="flex justify-around">
          <IconButton
            icon={faAngleLeft}
            class="w-full rounded-none rounded-tl"
            onClick$={() => setModalImage(imageIndex.value - 1)}
          />
          <IconButton
            icon={faAngleRight}
            class="w-full rounded-none rounded-tr"
            onClick$={() => setModalImage(imageIndex.value + 1)}
          />
        </div>
        <img
          width={1920}
          height={1080}
          alt={images[imageIndex.value]}
          src={imageSource.value}
          class="max-h-screen"
        />
      </Modal>
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
