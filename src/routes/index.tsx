import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

export default component$(() => {
  return (
    <>
      <div class="container mx-auto m-10 flex flex-col gap-10">
        <img src="/logo_wide.png" class="logo h-36 md:h-52 px-12 mx-auto" />
        <section>
          <p class="mx-10 mb-3">
            Wir sind der Gaming Club der Ostschweizer Fachhochschule. Bei uns
            wird mit Leidenschaft Videospiele gespielt und sich darüber
            ausgetauscht. Alle Arten von Gamern sind bei uns willkommen, egal
            auf welcher Konsole du spielst, kompetitiv / nur zum Spass oder
            welche Gamegenre du magst. Solange genug Interesse für ein Game
            vorhanden ist, wird es bei uns gespielt. Zusätzlich veranstalten wir
            regelmässig Turniere und spielen mit unseren kompetitiven Teams in
            den entsprechenden Ligen.
          </p>
          <p class="mx-10">
            Hast du lust ein Teil unseres Clubs zu sein? Dann tritt unserem
            Discord bei!
          </p>
        </section>
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
