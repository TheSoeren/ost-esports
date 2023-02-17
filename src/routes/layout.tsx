import { component$, Slot } from '@builder.io/qwik'
import Header from '../components/header'
import Navigation from '../components/navigation'

export default component$(() => {
  return (
    <>
      <main>
        <Header />
        <Navigation />
        <section>
          <Slot />
        </section>
      </main>
      <footer></footer>
    </>
  )
})
