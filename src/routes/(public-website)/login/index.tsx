import { $, component$, useContext, useVisibleTask$ } from '@builder.io/qwik'
import { useNavigate, type DocumentHead } from '@builder.io/qwik-city'
import { reset, useForm, zodForm$ } from '@modular-forms/qwik'
import type { ClientResponseError } from 'pocketbase'
import { z } from 'zod'
import LoadingBackdrop from '~/components/elements/loading-backdrop'
import { TextInput } from '~/components/form'
import { AuthContext } from '~/contexts/AuthContext'
import type { Snackbar } from '~/contexts/SnackbarContext'
import { SnackbarContext } from '~/contexts/SnackbarContext'

export const loginSchema = z.object({
  user: z.string().min(1, 'Dieses Feld darf nicht leer sein!'),
  password: z.string().min(1, 'Dieses Feld darf nicht leer sein!'),
})
type LoginForm = z.infer<typeof loginSchema>

export default component$(() => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useContext(SnackbarContext)
  const { login, authenticated } = useContext(AuthContext)
  const [loginForm, { Form, Field }] = useForm<LoginForm>({
    loader: { value: { user: '', password: '' } },
    validate: zodForm$(loginSchema),
  })

  useVisibleTask$(({ track }) => {
    track(() => authenticated.value)

    if (authenticated.value) {
      navigate('/profile')
    }
  })

  const handleSubmit = $(async (values: LoginForm) => {
    try {
      await login(values.user, values.password)
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
      reset(loginForm)
    }
  })

  return (
    <>
      <section class="flex justify-center">
        <Form class="w-full sm:w-1/2" onSubmit$={handleSubmit}>
          <Field name="user">
            {(field, props) => (
              <TextInput
                {...props}
                type="text"
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
          <button
            type="submit"
            class="btn-outline block ml-auto"
            disabled={loginForm.submitting || !loginForm.dirty}
          >
            Login
          </button>
        </Form>
      </section>
      {loginForm.submitting && <LoadingBackdrop />}
    </>
  )
})

export const head: DocumentHead = {
  title: 'OST eSports - Login',
}
