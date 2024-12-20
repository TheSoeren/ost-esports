import { component$, useStyles$ } from '@builder.io/qwik'
import { Link, routeLoader$, type DocumentHead } from '@builder.io/qwik-city'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from 'qwik-fontawesome'
import styles from '~/css/gallery/gallery-manager.css?inline'
import { getGalleriesByCreator } from '~/services/gallery-service'
import { getEdgePbInstance } from '~/services/pocketbase-service'
import type { Gallery } from '~/types/gallery'

export const useGalleries = routeLoader$<Gallery[]>(async ({ cookie }) => {
  const pb = getEdgePbInstance(cookie)
  const authRecord = pb.authStore.record
  if (!authRecord) {
    return []
  }

  return getGalleriesByCreator(authRecord.id, pb)
})

export default component$(() => {
  useStyles$(styles)
  const galleries = useGalleries()

  return (
    <section>
      <h1 class="dashboard-title">Galerie Manager</h1>
      <div class="gallery-manager">
        <Link class="btn-outline gallery-manager__add" href="create">
          <FaIcon icon={faPlus} />
        </Link>

        {galleries.value.map((gallery) => (
          <Link class="tile cursor-pointer" href={gallery.id} key={gallery.id}>
            <h2 class="gallery-manager__title">{gallery.name}</h2>
          </Link>
        ))}
      </div>
    </section>
  )
})

export const head: DocumentHead = {
  title: 'Galerie Manager',
}
