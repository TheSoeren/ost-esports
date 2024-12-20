import { component$, Slot } from '@builder.io/qwik'
import { SnackbarProvider } from '~/contexts/snackbar-context'

export default component$(() => {
  return (
    <SnackbarProvider>
      <Slot />
    </SnackbarProvider>
  )
})
