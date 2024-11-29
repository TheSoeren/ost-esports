import { $, component$, useContext } from '@builder.io/qwik'
import { routeLoader$, useNavigate } from '@builder.io/qwik-city'
import GalleryForm from '~/components/gallery/gallery-form'
import { AuthContext } from '~/contexts/auth-context'
import { SnackbarContext } from '~/contexts/snackbar-context'
import pb from '~/services/pocketbase'
import {
  deleteGallery,
  getGallery,
  updateGallery,
} from '~/services/gallery-service'
import type { Gallery } from '~/types'

export const useGallery = routeLoader$(async (event) => {
  const gallery = await getGallery(event.params.id)
  // TODO: Figure out why this does not work
  // gallery.coverImage = pb.getFileUrl(gallery, gallery.coverImage)
  // gallery.images = gallery.images.map((image) => pb.getFileUrl(gallery, image))
  // return gallery

  return {
    ...gallery,
    coverImage: pb.files.getURL(gallery, gallery.coverImage),
    images: gallery.images.map((image) => pb.files.getURL(gallery, image)),
  } as Gallery
})

export default component$(() => {
  const gallery = useGallery()
  const { authUser } = useContext(AuthContext)
  const { enqueueSnackbar } = useContext(SnackbarContext)
  const navigate = useNavigate()

  const handleSubmit$ = $(async (values: FormData) => {
    try {
      if (!authUser.value) {
        throw new Error('Not authenticated!')
      }

      // TODO: Images are not handled gracefully! Refactor this some day.
      const hasNewImages = !!values.get('images')
      if (hasNewImages) {
        // Delete all existing images before uploading new ones
        await updateGallery(gallery.value.id, {
          images: undefined,
        } as unknown as FormData)
      }

      await updateGallery(gallery.value.id, values)

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
    try {
      if (!authUser.value) {
        throw new Error('Not authenticated!')
      }

      await deleteGallery(gallery.value.id)

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
