import { component$, useStyles$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'
import styles from '~/css/navigation.css?inline'

export default component$(() => {
  useStyles$(styles)

  return (
    <section class="main-nav">
      <Link href="/" aria-label="Site Overview">
        <img
          src="/logo_wide.webp"
          alt="OST ESports Logo"
          class="logo h-14 justify-end"
        />
      </Link>
      <nav>
        <Link href="/news" class="main-nav-item">
          News
        </Link>
        <Link href="/games" class="main-nav-item">
          Teams
        </Link>
        <Link href="/gallery" class="main-nav-item">
          Gallerie
        </Link>
        <Link href="/join" class="main-nav-item">
          Mitmachen
        </Link>
      </nav>
    </section>
  )
})
