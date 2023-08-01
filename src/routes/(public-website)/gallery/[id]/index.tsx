import { component$, useSignal, useStylesScoped$ } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import Pocketbase from 'pocketbase'
import BackButton from '~/components/elements/back-button'
import IconButton from '~/components/elements/icon-button'
import Modal from '~/components/elements/modal'
import styles from '~/css/gallery/gallery-images.css?inline'
import usePocketbase from '~/hooks/usePocketbase'
import type { Gallery } from '~/types'
import { Collection } from '~/types'

export function circularSubtract(value: number, length: number) {
  return (value + length - 1) % length
}

export function circularAdd(value: number, length: number) {
  return (value + 1) % length
}

export const useGallery = routeLoader$<Gallery>(async (event) => {
  const pb = new Pocketbase(import.meta.env.VITE_API_URL)

  const galleries = await pb
    .collection(Collection.GALLERIES)
    .getOne<Gallery>(event.params.id)

  return structuredClone(galleries)
})

export default component$(() => {
  useStylesScoped$(styles)
  const pb = usePocketbase()
  const {
    value: { images, ...galleryObject },
  } = useGallery()
  const modalImage = useSignal(0)

  const getImageUrl = (image: string) => {
    return pb.files.getUrl(galleryObject, image)
  }

  return (
    <article>
      <BackButton href="/gallery" label="Galerie Auswahl" />
      <div class="gallery-images__container">
        {images.map((galleryImage, index) => (
          <img
            key={galleryImage}
            alt={galleryImage}
            class="gallery-images__image"
            src={getImageUrl(galleryImage)}
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
                  images.length
                )
              }}
            />
            <IconButton
              icon={faAngleRight}
              class="w-full rounded-none rounded-tr"
              onClick$={() => {
                modalImage.value = circularAdd(modalImage.value, images.length)
              }}
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
