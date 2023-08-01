import { $, component$, useContext } from '@builder.io/qwik'
import Pocketbase from 'pocketbase'
import { AuthContext } from '~/contexts/AuthContext'
import { Collection } from '~/types'
import { SnackbarContext } from '~/contexts/SnackbarContext'
import { useNavigate } from '@builder.io/qwik-city'
import GalleryForm from '~/components/gallery/gallery-form'

export default component$(() => {
  const { authUser } = useContext(AuthContext)
  const { enqueueSnackbar } = useContext(SnackbarContext)
  const navigate = useNavigate()

  const handleSubmit$ = $(async (values: FormData) => {
    const qrlPb = new Pocketbase(import.meta.env.VITE_API_URL)

    try {
      if (!authUser.value) {
        throw new Error('Not authenticated!')
      }

      values.append('creator', authUser.value.id)
      const gallery = await qrlPb
        .collection(Collection.GALLERIES)
        .create(values)

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
