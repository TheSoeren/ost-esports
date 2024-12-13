import type { Signal } from '@builder.io/qwik'
import { component$ } from '@builder.io/qwik'
import MainNav from './main-nav'
import LoadingBar from './loading-bar'

export interface HeaderProps {
  isAuthenticated: Signal<boolean>
}

export default component$(({ isAuthenticated }: HeaderProps) => {
  return (
    <header class="relative">
      <MainNav isAuthenticated={isAuthenticated} />
      <LoadingBar bottom />
    </header>
  )
})
