import { component$, Slot } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import Footer from '~/components/layout/footer'
import Header from '~/components/layout/header'
import { loadAuthStoreFromCookie } from '~/services/cookie-service'
import pb from '~/services/pocketbase'

export const useAuth = routeLoader$(async ({ cookie }) => {
  loadAuthStoreFromCookie(cookie)

  return pb.authStore.isValid
})

export default component$(() => {
  const isAuthenticated = useAuth()

  return (
    <section class="flex flex-col min-h-screen">
      <Header isAuthenticated={isAuthenticated} />
      <main class="public-content">
        <Slot />
      </main>
      <Footer />
    </section>
  )
})
