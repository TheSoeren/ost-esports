import { component$, Slot } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import Footer from '~/components/layout/footer'
import Header from '~/components/layout/header'
import { getEdgePbInstance } from '~/services/pocketbase-service'

export const useAuth = routeLoader$(async ({ cookie }) => {
  const pb = getEdgePbInstance(cookie)
  console.log(pb.authStore)
  return pb.authStore.isValid || Boolean(pb.authStore.token)
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
