import { $, component$, useContext } from '@builder.io/qwik'
import { useNavigate, type DocumentHead } from '@builder.io/qwik-city'
import { useForm, zodForm$, reset } from '@modular-forms/qwik'
import { z } from 'zod'
import { TextInput } from '~/components/form'
import type { ClientResponseError } from 'pocketbase'
import type { Snackbar } from '~/contexts/SnackbarContext'
import { SnackbarContext } from '~/contexts/SnackbarContext'
import { AuthContext } from '~/contexts/AuthContext'

export const loginSchema = z.object({
  user: z.string().min(1, 'Dieses Feld darf nicht leer sein!'),
  password: z.string().min(1, 'Dieses Feld darf nicht leer sein!'),
})
type LoginForm = z.infer<typeof loginSchema>

export default component$(() => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useContext(SnackbarContext)
  const { login } = useContext(AuthContext)
  const [loginForm, { Form, Field }] = useForm<LoginForm>({
    loader: { value: { user: '', password: '' } },
    validate: zodForm$(loginSchema),
  })

  const handleSubmit = $(async (values: LoginForm) => {
    try {
      await login(values.user, values.password)
      navigate('/')
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
