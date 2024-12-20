import { $, component$, useContext } from '@builder.io/qwik'
import { SnackbarContext } from '~/contexts/snackbar-context'
import type { DocumentHead } from '@builder.io/qwik-city'
import { useNavigate } from '@builder.io/qwik-city'
import type { NewsFormSchema } from '~/components/news/news-form'
import NewsForm from '~/components/news/news-form'
import { createNewsEntry } from '~/services/news-service'
import pb from '~/data/pocketbase'

export default component$(() => {
  const { enqueueSnackbar } = useContext(SnackbarContext)
  const navigate = useNavigate()

  const handleSubmit$ = $(async (values: NewsFormSchema) => {
    try {
      if (!pb.authStore.isValid || !pb.authStore.record) {
        throw new Error('Not authenticated!')
      }

      const newsEntry = await createNewsEntry({
        ...values,
        author: pb.authStore.record.id,
      })

      enqueueSnackbar({
        type: 'success',
        title: 'Newseintrag erfolgreich erstellt',
        duration: 3000,
      })
      navigate(`/news-manager/${newsEntry.id}`)
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
      <h1 class="dashboard-title">Newseintrag Erstellen</h1>
      <NewsForm onSubmit$={handleSubmit$} />
    </section>
  )
})

export const head: DocumentHead = {
  title: 'Create News Entry',
}
