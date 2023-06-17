import { component$, useStylesScoped$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'
import styles from '~/css/navigation.css?inline'

export default component$(() => {
  useStylesScoped$(styles)

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
        <Link href="/news" class="px-2">
          News
        </Link>
        <Link href="/games" class="px-2">
          Teams
        </Link>
        <Link href="/gallery" class="px-2">
          Gallerie
        </Link>
        <Link href="/join" class="px-2">
          Mitmachen
        </Link>
      </nav>
    </section>
  )
})
