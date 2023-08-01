import {
  Resource,
  component$,
  useContext,
  useResource$,
  useStyles$,
} from '@builder.io/qwik'
import { Link, type DocumentHead } from '@builder.io/qwik-city'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from 'qwik-fontawesome'
import DataManagerSkeleton from '~/components/elements/data-manager-skeleton'
import { AuthContext } from '~/contexts/AuthContext'
import type { Gallery } from '~/types'
import { Collection } from '~/types'
import styles from '~/css/gallery/gallery-manager.css?inline'

export default component$(() => {
  useStyles$(styles)
  const { pocketbase, authenticated, authUser } = useContext(AuthContext)

  const galleryResource = useResource$<Gallery[]>(async ({ track }) => {
    track(() => authenticated.value)
    const qrlPb = await pocketbase()
    if (!authUser.value) return []

    const response: Gallery[] = await qrlPb
      .collection(Collection.GALLERIES)
      .getFullList({
        filter: `creator="${authUser.value.id}"`,
      })

    return structuredClone(response)
  })

  return (
    <section>
      <h1 class="dashboard-title">Galerie Manager</h1>
      <div class="gallery-manager">
        <Link class="btn-outline gallery-manager__add" href="create">
          <FaIcon icon={faPlus} />
        </Link>

        <Resource
          value={galleryResource}
          onPending={() => <DataManagerSkeleton />}
          onRejected={(error) => <>Error: {error.message}</>}
          onResolved={(galleries) => (
            <>
              {galleries.map((gallery) => (
                <Link
                  class="tile cursor-pointer"
                  href={gallery.id}
                  key={gallery.id}
                >
                  <h2 class="gallery-manager__title">{gallery.name}</h2>
                </Link>
              ))}
            </>
          )}
        />
      </div>
    </section>
  )
})

export const head: DocumentHead = {
  title: 'Dashboard | Galerie Manager',
}
