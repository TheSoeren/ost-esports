import { component$, Slot } from '@builder.io/qwik'
import Footer from '~/components/layout/footer'
import Header from '~/components/layout/header'
import { AuthProvider } from '~/contexts/AuthContext'
import { SnackbarProvider } from '~/contexts/SnackbarContext'

export default component$(() => {
  return (
    <SnackbarProvider>
      <AuthProvider>
        <section class="flex flex-col min-h-screen">
          <Header />
          <main class="page-content">
            <Slot />
          </main>
          <Footer />
        </section>
      </AuthProvider>
    </SnackbarProvider>
  )
})
