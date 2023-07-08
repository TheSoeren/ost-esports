import { component$ } from '@builder.io/qwik'
import Navigation from './navigation'
import LoadingBar from './loading-bar'
import { useLocation } from '@builder.io/qwik-city'

export default component$(() => {
  const { isNavigating } = useLocation()

  return (
    <header class="relative">
      <Navigation />
      {isNavigating && <LoadingBar />}
    </header>
  )
})
