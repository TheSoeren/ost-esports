import { component$, useStyles$ } from '@builder.io/qwik'
import { Link, useLocation } from '@builder.io/qwik-city'
import styles from '~/css/navigation.css?inline'

export default component$(() => {
  useStyles$(styles)
  const location = useLocation()

  const navItems = [
    { label: 'News', href: '/news' },
    { label: 'Teams', href: '/games' },
    { label: 'Galerie', href: '/gallery' },
    { label: 'Mitmachen', href: '/join' },
  ]

  const urlMatcher = (url: string) =>
    location.url.pathname.startsWith(url + '/')

  return (
    <section class="main-nav flex flex-row">
      <Link href="/" aria-label="Site Overview">
        <img
          src="/logo_wide.webp"
          alt="OST ESports Logo"
          class="logo h-14 justify-end"
        />
      </Link>
      <nav class="flex flex-row justify-evenly flex-1">
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
  )
})
