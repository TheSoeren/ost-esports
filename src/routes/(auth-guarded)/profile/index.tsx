import { $, component$, useContext, useTask$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { reset, setValues, useForm, zodForm$ } from '@modular-forms/qwik'
import Pocketbase from 'pocketbase'
import { z } from 'zod'
import { TextInput } from '~/components/form'
import { AuthContext, isUserObject } from '~/contexts/AuthContext'
import { SnackbarContext } from '~/contexts/SnackbarContext'
import { Collection, type User } from '~/types'

export const profileSchema = z.object({
  gamertag: z.string().min(1),
})
type ProfileForm = z.infer<typeof profileSchema>

export const userToProfileForm = (user: User): ProfileForm => {
  return { gamertag: user.gamertag || '' }
}

export default component$(() => {
  const { authenticated, authUser } = useContext(AuthContext)
  const { enqueueSnackbar } = useContext(SnackbarContext)

  // Initializing values empty, because this happens server-side where the user is not authenticated
  const [profileForm, { Form, Field }] = useForm<ProfileForm>({
    loader: {
      value: {
        gamertag: '',
      },
    },
    validate: zodForm$(profileSchema),
  })

  useTask$(({ track }) => {
    track(() => authenticated.value)
    if (!authUser.value) return

    if (isUserObject(authUser)) {
      setValues(profileForm, userToProfileForm(authUser.value), {
        shouldDirty: false,
        shouldTouched: false,
      })
    }
  })

  const handleSubmit = $(async (values: ProfileForm) => {
    const qrlPb = new Pocketbase(import.meta.env.VITE_API_URL)
    if (!authUser.value) return

    try {
      await qrlPb
        .collection(Collection.USERS)
        .update<User>(authUser.value.id, values)

      enqueueSnackbar({
        type: 'success',
        title: 'Daten erfolgreich aktualisiert',
        duration: 3000,
      })

      reset(profileForm, { initialValues: values })
    } catch (error: unknown) {
      enqueueSnackbar({
        type: 'error',
        title: 'Änderung fehlgeschlagen!',
        message:
          'Die Änderung konnte nicht durchgeführt werden. Versuchen Sie es später erneut.',
        duration: 3000,
      })
      reset(profileForm, { initialValues: userToProfileForm(authUser.value) })
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
  title: 'Dashboard | Profil',
}
