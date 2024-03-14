import {
  $,
  component$,
  useContext,
  useSignal,
  useStyles$,
  useTask$,
} from '@builder.io/qwik'
import { Link, useLocation } from '@builder.io/qwik-city'
import Burger from '~/components/elements/burger'
import { AuthContext } from '~/contexts/AuthContext'
import styles from '~/css/layout/main-nav.css?inline'
import useClickOutside from '~/hooks/useClickOutside'
import type { NavItem } from '~/types/navigation'

export const navItems: NavItem[] = [
  { label: 'News', href: '/news' },
  { label: 'Teams', href: '/games' },
  { label: 'Galerie', href: '/gallery' },
  { label: 'Mitmachen', href: '/join' },
]

export default component$(() => {
  useStyles$(styles)
  const { authenticated } = useContext(AuthContext)
  const location = useLocation()
  const isOpen = useSignal(false)
  const navRef = useSignal<HTMLElement>()

  const closeMenu = $(() => {
    isOpen.value = false
  })

  // Handle automatic navigation menu closing
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
            <img src="/discord-wide.svg" alt="join discord" />
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

          {authenticated.value ? (
            <Link
              href="/profile"
              class={[
                'nav-item',
                urlMatcher('/profile') ? 'nav-item--highlight' : '',
              ]}
            >
              DASHBOARD
            </Link>
          ) : (
            <Link
              href="/login"
              class={[
                'nav-item',
                urlMatcher('/login') ? 'nav-item--highlight' : '',
              ]}
            >
              LOGIN
            </Link>
          )}
        </nav>
      </section>
    </section>
  )
})
