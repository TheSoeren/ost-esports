import { $, component$, useContext } from '@builder.io/qwik'
import Pocketbase from 'pocketbase'
import { AuthContext } from '~/contexts/AuthContext'
import { Collection } from '~/types'
import { SnackbarContext } from '~/contexts/SnackbarContext'
import { useNavigate } from '@builder.io/qwik-city'
import type { NewsFormSchema } from '~/components/news/news-form'
import NewsForm from '~/components/news/news-form'

export default component$(() => {
  const { authUser } = useContext(AuthContext)
  const { enqueueSnackbar } = useContext(SnackbarContext)
  const navigate = useNavigate()

  const handleSubmit$ = $(async (values: NewsFormSchema) => {
    const qrlPb = new Pocketbase(import.meta.env.VITE_API_URL)

    try {
      if (!authUser.value) {
        throw new Error('Not authenticated!')
      }

      const newsEntry = await qrlPb.collection(Collection.NEWS).create({
        ...values,
        author: authUser.value.id,
      })

      enqueueSnackbar({
        type: 'success',
        title: 'Newseintrag erfolgreich erstellt',
        duration: 3000,
      })
      navigate(`/news-manager/${newsEntry.id}`)
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
      <h1 class="dashboard-title">Newseintrag Erstellen</h1>
      <NewsForm onSubmit$={handleSubmit$} />
    </section>
  )
})
