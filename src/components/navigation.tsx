import { component$, useStyles$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'
import styles from '~/css/navigation.css?inline'

export default component$(() => {
  useStyles$(styles)

  const navItems = [
    { label: 'News', href: '/news' },
    { label: 'Teams', href: '/games' },
    { label: 'Galerie', href: '/gallery' },
    { label: 'Mitmachen', href: '/join' },
  ]

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
          <Link href={item.href} class="nav-item" key={index}>
            {item.label.toUpperCase()}
          </Link>
        ))}
      </nav>
    </section>
  )
})
