import { component$ } from '@builder.io/qwik'

export default component$(() => {
  return (
    <nav class="main-nav mx-auto">
      <div>
        <a href="/news" class="main-nav-item">
          News
        </a>
        <a href="/games" class="main-nav-item">
          Games
        </a>
        <a href="/join" class="main-nav-item">
          Mitmachen
        </a>
        <a href="/gallery" class="main-nav-item hidden">
          Gallerie
        </a>
      </div>
      <a href="#">
        <img src="/logo_wide.png" class="logo h-14 justify-end" />
      </a>
    </nav>
  )
})
