import { component$ } from '@builder.io/qwik'
import ImgBanner from '~/media/banner.webp?jsx'

export default component$(() => {
  return (
    <footer class="mt-auto">
      <ImgBanner
        alt="Banner with Valorant, Rocket League and League of Legends"
        class="w-full min-h-[12rem] max-h-72 object-center object-cover"
      />
    </footer>
  )
})
