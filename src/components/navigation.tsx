import { component$, useStylesScoped$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'
import styles from '~/css/navigation.css?inline'

export default component$(() => {
  useStylesScoped$(styles)

  const navItems = [
    { label: 'NEWS', href: '/news' },
    { label: 'TEAMS', href: '/games' },
    { label: 'GALERIE', href: '/gallery' },
    { label: 'MITMACHEN', href: '/join' },
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
          <Link href={item.href} class="nav-item text-lg font-bold" key={index}>
            {item.label}
          </Link>
        ))}
      </nav>
    </section>
  )
})
