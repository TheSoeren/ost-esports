import { $, component$, useContext } from '@builder.io/qwik'
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city'
import { reset, useForm, zodForm$ } from '@modular-forms/qwik'
import { z } from 'zod'
import { TextInput } from '~/components/form'
import { SnackbarContext } from '~/contexts/snackbar-context'
import { exportAuthStoreToCookie } from '~/services/cookie-service'
import pb from '~/services/pocketbase'
import { updateUser } from '~/services/user-service'

export const profileSchema = z.object({
  gamertag: z.string().min(1),
})
export type ProfileForm = z.infer<typeof profileSchema>

export const useProfile = routeLoader$<ProfileForm>(async () => {
  const authRecord = pb.authStore.record
  return { gamertag: authRecord ? authRecord.gamertag : '' }
})

export default component$(() => {
  const { enqueueSnackbar } = useContext(SnackbarContext)
  const profile = useProfile()

  const [profileForm, { Form, Field }] = useForm<ProfileForm>({
    loader: profile,
    validate: zodForm$(profileSchema),
  })

  const handleSubmit = $(async (values: ProfileForm) => {
    try {
      if (!pb.authStore.isValid || !pb.authStore.record) {
        throw Error('Not Authenticated!')
      }

      await updateUser(pb.authStore.record.id, values)

      enqueueSnackbar({
        type: 'success',
        title: 'Daten erfolgreich aktualisiert',
        duration: 3000,
      })

      exportAuthStoreToCookie()
      reset(profileForm, { initialValues: values })
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
      <h1 class="dashboard-title">Profil</h1>
      <Form onSubmit$={handleSubmit}>
        <Field name="gamertag">
          {(field, props) => (
            <TextInput
              {...props}
              type="text"
              label="Gamertag"
              value={field.value}
              error={field.error}
              required
            />
          )}
        </Field>
        <button
          type="submit"
          class="btn-outline block ml-auto"
          disabled={profileForm.submitting || !profileForm.dirty}
        >
          Speichern
        </button>
      </Form>
    </section>
  )
})

export const head: DocumentHead = {
  title: 'Profil',
}
