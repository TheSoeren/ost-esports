import { $, component$, useContext } from '@builder.io/qwik'
import {
  Link,
  routeLoader$,
  useLocation,
  useNavigate,
  type DocumentHead,
} from '@builder.io/qwik-city'
import { reset, useForm, zodForm$ } from '@modular-forms/qwik'
import type { ClientResponseError } from 'pocketbase'
import { z } from 'zod'
import LoadingBackdrop from '~/components/elements/loading-backdrop'
import { TextInput } from '~/components/form'
import type { Snackbar } from '~/contexts/snackbar-context'
import { SnackbarContext } from '~/contexts/snackbar-context'
import { loadAuthStoreFromCookie } from '~/services/cookie-service'
import pb from '~/services/pocketbase'
import { login } from '~/services/user-service'

export const loginSchema = z.object({
  user: z.string().min(1, 'Dieses Feld darf nicht leer sein!'),
  password: z.string().min(1, 'Dieses Feld darf nicht leer sein!'),
})
type LoginForm = z.infer<typeof loginSchema>

export const useRedirect = routeLoader$(async ({ cookie, redirect }) => {
  loadAuthStoreFromCookie(cookie)

  if (pb.authStore.isValid) {
    throw redirect(302, `/profile`)
  }
})

export default component$(() => {
  const navigate = useNavigate()
  const { url } = useLocation()
  const { enqueueSnackbar } = useContext(SnackbarContext)
  const [loginForm, { Form, Field }] = useForm<LoginForm>({
    loader: { value: { user: '', password: '' } },
    validate: zodForm$(loginSchema),
  })

  const landingPage = url.searchParams.get('redirect') ?? '/'

  const handleSubmit = $(async (values: LoginForm) => {
    try {
      await login(values.user, values.password)

      enqueueSnackbar({
        type: 'success',
        title: 'Anmeldung erfolgreich',
        duration: 3000,
      })
      navigate(landingPage)
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
          <section class="flex justify-end gap-2 items-center">
            <Link class="btn-link" href="/register">
              Account erstellen
            </Link>
            <button
              type="submit"
              class="btn-outline block ml-auto"
              disabled={loginForm.submitting || !loginForm.dirty}
            >
              Login
            </button>
          </section>
        </Form>
      </section>
      {loginForm.submitting && <LoadingBackdrop />}
    </>
  )
})

export const head: DocumentHead = {
  title: 'OST eSports - Login',
}
