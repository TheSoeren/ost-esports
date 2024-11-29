import { $, component$, useContext } from '@builder.io/qwik'
import { AuthContext } from '~/contexts/auth-context'
import { SnackbarContext } from '~/contexts/snackbar-context'
import { useNavigate } from '@builder.io/qwik-city'
import GalleryForm from '~/components/gallery/gallery-form'
import { createGallery } from '~/services/gallery-service'

export default component$(() => {
  const { authUser } = useContext(AuthContext)
  const { enqueueSnackbar } = useContext(SnackbarContext)
  const navigate = useNavigate()

  const handleSubmit$ = $(async (values: FormData) => {
    try {
      if (!authUser.value) {
        throw new Error('Not authenticated!')
      }

      values.append('creator', authUser.value.id)
      const gallery = await createGallery(values)

      enqueueSnackbar({
        type: 'success',
        title: 'Galerie erfolgreich erstellt',
        duration: 3000,
      })
      navigate(`/gallery-manager/${gallery.id}`)
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

  return (
    <section>
      <h1 class="dashboard-title">Galerie Erstellen</h1>
      <GalleryForm onSubmit$={handleSubmit$} />
    </section>
  )
})
