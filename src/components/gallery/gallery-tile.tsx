import {
  Resource,
  component$,
  useResource$,
  useStylesScoped$,
} from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'
import pb from '~/pocketbase'
import type { Gallery, GalleryImage } from '~/types'
import styles from '~/css/gallery/gallery-tile.css?inline'

export function random() {
  return Math.round(Math.random())
}

export default component$(({ name, id }: Gallery) => {
  useStylesScoped$(styles)

  const imageResource = useResource$<GalleryImage>(async () => {
    const response = await pb
      .collection('gallery_images')
      .getFirstListItem<GalleryImage>(`gallery="${id}"`)

    return structuredClone(response)
  })

  return (
    <section
      class={['gallery__tile', random() ? 'hover:-rotate-1' : 'hover:rotate-1']}
    >
      <Link
        href={record.id}
        class="absolute top-0 left-0 h-full w-full rounded"
      >
        <div class="gallery__tile-backdrop">
          <span class="gallery__tile-backdrop-text">{name}</span>
        </div>
        <Resource
          value={imageResource}
          onRejected={() => <div class="bg-ost-violet rounded-lg h-full"></div>}
          onResolved={(galleryImage) => (
            <img
              src={pb.files.getUrl(galleryImage, galleryImage.image)}
              alt={name}
              class="gallery__tile-image"
            />
          )}
        />
      </Link>
    </section>
  )
})
