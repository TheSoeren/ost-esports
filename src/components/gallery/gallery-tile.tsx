import { component$, useStylesScoped$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'
import pb from '~/pocketbase'
import type { Gallery } from '~/types'
import styles from '~/css/gallery/gallery-tile.css?inline'

export function random() {
  return Math.round(Math.random())
}

export default component$(({ name, coverImage, ...record }: Gallery) => {
  useStylesScoped$(styles)

  return (
    <section
      class={['gallery__tile', random() ? 'hover:-rotate-1' : 'hover:rotate-1']}
    >
      <Link
        href={record.id}
        class="absolute top-0 left-0 h-full w-full rounded-lg"
      >
        <div class="gallery__tile-backdrop">
          <span class="gallery__tile-backdrop-text">{name}</span>
        </div>
        <img
          src={pb.files.getUrl(record, coverImage)}
          alt={name}
          class="gallery__tile-image"
        />
      </Link>
    </section>
  )
})
