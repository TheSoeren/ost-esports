import { component$ } from '@builder.io/qwik'
import MainNav from './main-nav'
import LoadingBar from './loading-bar'

export default component$(() => {
  return (
    <header class="relative">
      <MainNav />
      <LoadingBar bottom />
    </header>
  )
})
