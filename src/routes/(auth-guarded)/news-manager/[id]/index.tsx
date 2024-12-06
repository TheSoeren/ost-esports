import { $, component$, useContext } from '@builder.io/qwik'
import { routeLoader$, useNavigate } from '@builder.io/qwik-city'
import type { NewsEntry } from '~/types'
import { SnackbarContext } from '~/contexts/snackbar-context'
import type { FormStore } from '@modular-forms/qwik'
import { reset } from '@modular-forms/qwik'
import type { NewsFormSchema } from '~/components/news/news-form'
import NewsForm from '~/components/news/news-form'
import {
  deleteNewsEntry,
  getNewsEntry,
  updateNewsEntry,
} from '~/services/news-service'

export const useNewsEntry = routeLoader$<NewsEntry>(async (event) => {
  return getNewsEntry(event.params.id)
})

export default component$(() => {
  const newsEntry = useNewsEntry()
  const { enqueueSnackbar } = useContext(SnackbarContext)
  const navigate = useNavigate()

  const handleSubmit$ = $(
    async (values: NewsFormSchema, form: FormStore<any, undefined>) => {
      try {
        await updateNewsEntry(newsEntry.value.id, values)
        enqueueSnackbar({
          type: 'success',
          title: 'Newsartikel erfolgreich aktualisiert',
          duration: 3000,
        })
        reset(form, { initialValues: values })
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
    }
  )

  const handleDelete$ = $(async () => {
    try {
      await deleteNewsEntry(newsEntry.value.id)

      enqueueSnackbar({
        type: 'success',
        title: 'Newsartikel erfolgreich gelöscht',
        duration: 3000,
      })
      navigate('/news-manager')
    } catch (error: unknown) {
      console.error(error)
      enqueueSnackbar({
        type: 'error',
        title: 'Löschen fehlgeschlagen!',
        message:
          'Der Newsartikel konnte nicht gelöscht werden. Versuchen Sie es später erneut.',
        duration: 3000,
      })
    }
  })

  return (
    <section>
      <h1 class="dashboard-title">Newseintrag Bearbeiten</h1>
      <NewsForm
        newsEntry={newsEntry.value}
        onSubmit$={handleSubmit$}
        onDelete$={handleDelete$}
        edit
      />
    </section>
  )
})
