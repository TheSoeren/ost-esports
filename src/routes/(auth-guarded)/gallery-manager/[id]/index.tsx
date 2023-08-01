import { $, component$, useContext } from '@builder.io/qwik'
import { routeLoader$, useNavigate } from '@builder.io/qwik-city'
import Pocketbase from 'pocketbase'
import GalleryForm from '~/components/gallery/gallery-form'
import { AuthContext } from '~/contexts/AuthContext'
import { SnackbarContext } from '~/contexts/SnackbarContext'
import type { Gallery } from '~/types'
import { Collection } from '~/types'

export const useGallery = routeLoader$<Gallery>(async (event) => {
  const pb = new Pocketbase(import.meta.env.VITE_API_URL)

  const gallery = await pb
    .collection(Collection.GALLERIES)
    .getOne<Gallery>(event.params.id)

  return {
    ...gallery,
    coverImage: pb.getFileUrl(gallery, gallery.coverImage),
    images: gallery.images.map((image) => pb.getFileUrl(gallery, image)),
  }
})

export default component$(() => {
  const gallery = useGallery()
  const { authUser } = useContext(AuthContext)
  const { enqueueSnackbar } = useContext(SnackbarContext)
  const navigate = useNavigate()

  const handleSubmit$ = $(async (values: FormData) => {
    const qrlPb = new Pocketbase(import.meta.env.VITE_API_URL)

    try {
      if (!authUser.value) {
        throw new Error('Not authenticated!')
      }

      const hasNewImages = !!values.get('images')
      if (hasNewImages) {
        // Delete all existing images before uploading new ones
        await qrlPb
          .collection(Collection.GALLERIES)
          .update(gallery.value.id, { images: null })
      }

      await qrlPb
        .collection(Collection.GALLERIES)
        .update(gallery.value.id, values)

      enqueueSnackbar({
        type: 'success',
        title: 'Galerie erfolgreich aktualisiert',
        duration: 3000,
      })
    } catch (error: unknown) {
      enqueueSnackbar({
        type: 'error',
        title: 'Änderung fehlgeschlagen!',
        message:
          'Die Änderung konnte nicht durchgeführt werden. Versuchen Sie es später erneut.',
        duration: 3000,
      })
    }
  })

  const handleDelete$ = $(async () => {
    const qrlPb = new Pocketbase(import.meta.env.VITE_API_URL)

    try {
      if (!authUser.value) {
        throw new Error('Not authenticated!')
      }

      await qrlPb.collection(Collection.GALLERIES).delete(gallery.value.id)

      enqueueSnackbar({
        type: 'success',
        title: 'Galerie erfolgreich gelöscht',
        duration: 3000,
      })
      navigate('/gallery-manager')
    } catch (error: unknown) {
      enqueueSnackbar({
        type: 'error',
        title: 'Löschen fehlgeschlagen!',
        message:
          'Die Galerie konnte nicht gelöscht werden. Versuchen Sie es später erneut.',
        duration: 3000,
      })
    }
  })

  return (
    <section>
      <h1 class="dashboard-title">Galerie Bearbeiten</h1>
      <GalleryForm
        gallery={gallery.value}
        onSubmit$={handleSubmit$}
        onDelete$={handleDelete$}
        edit
      />
    </section>
  )
})
