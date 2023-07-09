import type { QRL } from '@builder.io/qwik'
import { $, component$, useContext } from '@builder.io/qwik'
import { type DocumentHead } from '@builder.io/qwik-city'
import type { SubmitHandler } from '@modular-forms/qwik'
import { formAction$, useForm, zodForm$, reset } from '@modular-forms/qwik'
import { z } from 'zod'
import { TextInput } from '~/components/form'
import type { ClientResponseError } from 'pocketbase'
import PocketBase from 'pocketbase'
import type { Snackbar } from '~/contexts/SnackbarContext'
import { SnackbarContext } from '~/contexts/SnackbarContext'

export const loginSchema = z.object({
  email: z.string().min(1, 'Dieses Feld darf nicht leer sein!'),
  password: z.string().min(1, 'Dieses Feld darf nicht leer sein!'),
})
type LoginForm = z.infer<typeof loginSchema>

export const useFormAction = formAction$<LoginForm>(async (values) => {
  const pb = new PocketBase(import.meta.env.VITE_API_URL)
  const formValues = Object.values(values) as [string, string]

  await pb.collection('users').authWithPassword(...formValues)
}, zodForm$(loginSchema))

export default component$(() => {
  const { enqueueSnackbar } = useContext(SnackbarContext)
  const [loginForm, { Form, Field }] = useForm<LoginForm>({
    loader: { value: { email: '', password: '' } },
    validate: zodForm$(loginSchema),
  })

  const handleSubmit: QRL<SubmitHandler<LoginForm>> = $(async (values) => {
    const pb = new PocketBase(import.meta.env.VITE_API_URL)
    const formValues = Object.values(values) as [string, string]

    try {
      await pb.collection('users').authWithPassword(...formValues)
    } catch (error: unknown) {
      const responseError = error as ClientResponseError
      const snackbar: Snackbar = {
        type: 'error',
        title: 'Authentifizierung fehlgeschlagen!',
        message:
          'Die Authentifizierung konnte nicht durchgeführt werden. Versuchen Sie es später erneut.',
        duration: 3000,
      }

      if (responseError.status === 400) {
        snackbar.message =
          'Benutzername/Email und Passwort Kombination stimmt nicht mit unseren Daten überein.'
      }

      enqueueSnackbar(snackbar)
    } finally {
      reset(loginForm)
    }
  })

  return (
    <section class="flex justify-center">
      <Form class="w-full sm:w-1/2" onSubmit$={handleSubmit}>
        <Field name="email">
          {(field, props) => (
            <TextInput
              {...props}
              type="email"
              label="Username / Email"
              value={field.value}
              error={field.error}
              required
            />
          )}
        </Field>
        <Field name="password">
          {(field, props) => (
            <TextInput
              {...props}
              type="password"
              label="Passwort"
              value={field.value}
              error={field.error}
              required
            />
          )}
        </Field>
        <button type="submit" class="btn-outline block ml-auto">
          Login
        </button>
      </Form>
    </section>
  )
})

export const head: DocumentHead = {
  title: 'OST eSports - Login',
}
