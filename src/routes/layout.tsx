import { component$, Slot } from '@builder.io/qwik'

import Footer from '~/components/footer'
import Header from '~/components/header'
import Navigation from '../components/navigation'

export default component$(() => {
  return (
    <section class="flex flex-col min-h-screen">
      <Header />
      <main class="flex-grow">
       <Navigation />
         develop
        <section>
          <Slot />
        </section>
      </main>
      <Footer />
    </section>
  )
})
