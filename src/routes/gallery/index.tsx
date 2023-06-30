import {
  Resource,
  component$,
  useResource$,
  useStylesScoped$,
} from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import type { ListResult } from 'pocketbase'
import pb from '~/pocketbase'
import type { Gallery } from '~/types/gallery'
import styles from '~/css/gallery/index.css?inline'
import GalleryTile from '~/components/gallery/gallery-tile'

export default component$(() => {
  useStylesScoped$(styles)

  const teamsResource = useResource$<ListResult<Gallery>>(async () => {
    const response = await pb.collection('galleries').getList<Gallery>(1, 30)

    return structuredClone(response)
  })

  return (
    <article>
      <div class="gallery__container">
        <Resource
          value={teamsResource}
          onResolved={(galleries) => (
            <>
              {galleries.items.map((gallery) => (
                <GalleryTile key={gallery.id} {...gallery} />
              ))}
            </>
          )}
        />
      </div>
    </article>
  )
})

export const head: DocumentHead = {
  title: 'OST eSports - Gallerie',
}
