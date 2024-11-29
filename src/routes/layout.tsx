import { component$, Slot } from '@builder.io/qwik'
import { AuthProvider } from '~/contexts/auth-context'
import { SnackbarProvider } from '~/contexts/snackbar-context'

export default component$(() => {
  return (
    <SnackbarProvider>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </SnackbarProvider>
  )
})
