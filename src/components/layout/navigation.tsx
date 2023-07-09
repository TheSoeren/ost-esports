import {
  $,
  component$,
  useSignal,
  useStyles$,
  useTask$,
} from '@builder.io/qwik'
import { Link, useLocation } from '@builder.io/qwik-city'
import styles from '~/css/navigation.css?inline'
import Burger from '~/components/elements/burger'
import useClickOutside from '~/hooks/useClickOutside'

export const navItems = [
  { label: 'News', href: '/news' },
  { label: 'Teams', href: '/games' },
  { label: 'Galerie', href: '/gallery' },
  { label: 'Mitmachen', href: '/join' },
]

export default component$(() => {
  useStyles$(styles)
  const location = useLocation()
  const isOpen = useSignal(false)
  const navRef = useSignal<HTMLElement>()

  const closeMenu = $(() => {
    isOpen.value = false
  })

  // Handle automatic menu closing
  useClickOutside(navRef, closeMenu)
  useTask$(({ track }) => {
    track(() => location.isNavigating)

    // Close if navigating is false to close menu and load page at the same time
    if (!location.isNavigating) {
      closeMenu()
    }
  })

  const urlMatcher = (url: string) =>
    location.url.pathname.startsWith(url + '/')

  return (
    <section class="main-nav" ref={navRef}>
      <div class="brand-container">
        <Link href="/" aria-label="Site Overview" class="shrink-0">
          <img src="/logo_wide.webp" alt="OST ESports Logo" class="logo h-14" />
        </Link>
        <button
          class="menu-toggle"
          onClick$={() => (isOpen.value = !isOpen.value)}
          aria-label="Toggle Menu"
        >
          <Burger open={isOpen} />
        </button>
      </div>
      <section class="flex justify-between w-full">
        <div
          class={['sm:hidden mt-5 w-2/5', !isOpen.value ? 'hidden' : '']}
          aria-label="Additional Links"
        >
          <a href="https://discord.gg/UAWGz7gg5A" target="_blank" class="block">
            <img src="/join_discord.svg" alt="join discord" />
          </a>
        </div>
        <nav
          class={['navigation w-1/2', isOpen.value ? 'flex' : 'hidden sm:flex']}
        >
          {navItems.map((item, index) => (
            <Link
              href={item.href}
              class={[
                'nav-item',
                urlMatcher(item.href) ? 'nav-item--highlight' : '',
              ]}
              key={index}
            >
              {item.label.toUpperCase()}
            </Link>
          ))}
        </nav>
      </section>
    </section>
  )
})
