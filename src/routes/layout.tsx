import { component$, Slot } from '@builder.io/qwik'
import Footer from '~/components/layout/footer'
import Header from '~/components/layout/header'

export default component$(() => {
  return (
    <section class="flex flex-col min-h-screen">
      <Header />
      <main class="page-content">
        <Slot />
      </main>
      <Footer />
    </section>
  )
})
