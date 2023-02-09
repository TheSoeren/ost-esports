import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

export default component$(() => {
  return (
    <>
      <div class="container mx-auto m-10 flex flex-col gap-10">
        <img src="/logo_wide.png" class="logo h-36 md:h-52 px-12 mx-auto" />
        <p class="mx-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
          ultricies ullamcorper risus, et molestie orci tempor a. Etiam
          tincidunt ligula id efficitur laoreet. Phasellus pulvinar tempus
          lorem, in malesuada nulla laoreet at. Praesent scelerisque augue
          purus, eget ultricies orci bibendum eget. Quisque cursus venenatis
          porttitor. Sed porta at ante sed consequat. Etiam sed condimentum
          orci. Nam rutrum justo a massa consectetur egestas. Aliquam nibh
          tortor, tincidunt sit amet gravida ac, commodo nec elit. Nullam ex
          erat, ultrices vitae laoreet non, posuere ut dui. Nulla vestibulum,
          lorem non pellentesque lobortis, justo enim lacinia justo, at
          efficitur diam dui ac nisi.
        </p>
        <a
          href="https://discord.gg/UAWGz7gg5A"
          class="absolute bottom-[25%] md:bottom-[30%] self-center w-1/2 md:w-1/3 lg:w-1/6"
        >
          <img src="join_discord.svg" alt="join discord" />
        </a>
      </div>
      <img
        src="banner.png"
        alt="Banner with Valorant, Rocket League and League of Legends"
        class="absolute bottom-0 w-full min-h-[20%] max-h-[25%] object-right object-cover"
      />
    </>
  )
})

export const head: DocumentHead = {
  title: 'OST ESports',
}
