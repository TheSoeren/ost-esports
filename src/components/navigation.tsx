import { component$, useStylesScoped$ } from '@builder.io/qwik'
import styles from '~/css/navigation.css?inline'

export default component$(() => {
  useStylesScoped$(styles)

  return (
    <section class="main-nav">
      <a href="/">
        <img src="/logo_wide.png" class="logo h-14 justify-end" />
      </a>
      <nav>
        <a href="/news" class="main-nav-item">
          News
        </a>
        <a href="/games" class="main-nav-item">
          Teams
        </a>
        <a href="/join" class="main-nav-item">
          Mitmachen
        </a>
        <a href="/gallery" class="main-nav-item hidden">
          Gallerie
        </a>
      </nav>
    </section>
  )
})
