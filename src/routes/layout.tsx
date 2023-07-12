import { component$, Slot } from '@builder.io/qwik'
import { AuthProvider } from '~/contexts/AuthContext'
import { SnackbarProvider } from '~/contexts/SnackbarContext'

export default component$(() => {
  return (
    <SnackbarProvider>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </SnackbarProvider>
  )
})
