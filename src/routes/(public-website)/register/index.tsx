import { $, component$, useContext, useVisibleTask$ } from '@builder.io/qwik'
import { useNavigate, type DocumentHead } from '@builder.io/qwik-city'
import { useForm, zodForm$ } from '@modular-forms/qwik'
import { z } from 'zod'
import LoadingBackdrop from '~/components/elements/loading-backdrop'
import { TextInput } from '~/components/form'
import { AuthContext } from '~/contexts/AuthContext'
import type { Snackbar } from '~/contexts/SnackbarContext'
import { SnackbarContext } from '~/contexts/SnackbarContext'

export const registerSchema = z
  .object({
    username: z.string().min(1, 'Dieses Feld darf nicht leer sein!'),
    email: z
      .string()
      .regex(
        /^[\w-.]+@ost.ch$/,
        'Du musst dich mit deiner ost.ch Email-Adresse registrieren!'
      ),
    password: z
      .string()
      .min(8, 'Dein Passwort muss mindestens 8 Zeichen beinhalten!'),
    passwordConfirm: z
      .string()
      .min(8, 'Dein Passwort muss mindestens 8 Zeichen beinhalten!'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Die angegebenen Passwörter stimmen nicht überein!',
    path: ['confirmPassword'],
  })
export type RegisterForm = z.infer<typeof registerSchema>

export default component$(() => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useContext(SnackbarContext)
  const { register, authenticated } = useContext(AuthContext)
  const [registerForm, { Form, Field }] = useForm<RegisterForm>({
    loader: {
      value: { username: '', email: '', password: '', passwordConfirm: '' },
    },
    validate: zodForm$(registerSchema),
  })

  useVisibleTask$(({ track }) => {
    track(() => authenticated.value)

    if (authenticated.value) {
      navigate('/profile')
    }
  })

  const handleSubmit = $(async (values: RegisterForm) => {
    try {
      await register(values)

      enqueueSnackbar({
        type: 'success',
        title: 'Registrierung erfolgreich',
        duration: 3000,
      })
      navigate('/login')
    } catch (error: unknown) {
      console.log(error)

      const snackbar: Snackbar = {
        type: 'error',
        title: 'Registrierung fehlgeschlagen!',
        message:
          'Die Registrierung konnte nicht durchgeführt werden. Versuchen Sie es später erneut.',
        duration: 3000,
      }

      enqueueSnackbar(snackbar)
    }
  })

  return (
    <>
      <section class="flex justify-center">
        <Form class="w-full sm:w-1/2" onSubmit$={handleSubmit}>
          <Field name="username">
            {(field, props) => (
              <TextInput
                {...props}
                type="text"
                label="Benutzername"
                value={field.value}
                error={field.error}
                required
              />
            )}
          </Field>
          <Field name="email">
            {(field, props) => (
              <TextInput
                {...props}
                type="text"
                label="OST Email-Adresse"
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
          <Field name="passwordConfirm">
            {(field, props) => (
              <TextInput
                {...props}
                type="password"
                label="Passwort wiederholen"
                value={field.value}
                error={field.error}
                required
              />
            )}
          </Field>
          <button
            type="submit"
            class="btn-outline block ml-auto"
            disabled={registerForm.submitting || !registerForm.dirty}
          >
            Registrieren
          </button>
        </Form>
      </section>
      {registerForm.submitting && <LoadingBackdrop />}
    </>
  )
})

export const head: DocumentHead = {
  title: 'OST eSports - Login',
}
