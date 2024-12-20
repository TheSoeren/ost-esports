import { $, component$, useContext } from '@builder.io/qwik'
import { SnackbarContext } from '~/contexts/snackbar-context'
import { useNavigate } from '@builder.io/qwik-city'
import GalleryForm from '~/components/gallery/gallery-form'
import { createGallery } from '~/services/gallery-service'
import pb from '~/services/pocketbase'

export default component$(() => {
  const { enqueueSnackbar } = useContext(SnackbarContext)
  const navigate = useNavigate()

  const handleSubmit$ = $(async (values: FormData) => {
    try {
      if (!pb.authStore.isValid || !pb.authStore.record) {
        throw new Error('Not authenticated!')
      }

      values.append('creator', pb.authStore.record.id)
      const gallery = await createGallery(values)

      enqueueSnackbar({
        type: 'success',
        title: 'Galerie erfolgreich erstellt',
        duration: 3000,
      })
      navigate(`/gallery-manager/${gallery.id}`)
    } catch (error: unknown) {
      console.error(error)
      enqueueSnackbar({
        type: 'error',
        title: 'Änderung fehlgeschlagen!',
        message:
          'Die Änderung konnte nicht durchgeführt werden. Versuchen Sie es später erneut.',
        duration: 3000,
      })
    }
  })

  return (
    <section>
      <h1 class="dashboard-title">Galerie Erstellen</h1>
      <GalleryForm onSubmit$={handleSubmit$} />
    </section>
  )
})
