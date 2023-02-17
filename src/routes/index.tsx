import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

export default component$(() => {
  return (
    <section class="container p-8 mx-auto flex flex-col gap-4">
      <p>
        Wir sind der Gaming Club der Ostschweizer Fachhochschule. Bei uns wird
        mit Leidenschaft Videospiele gespielt und sich darüber ausgetauscht.
        Alle Arten von Gamern sind bei uns willkommen, egal auf welcher Konsole
        du spielst, kompetitiv / nur zum Spass oder welche Gamegenre du magst.
        Solange genug Interesse für ein Game vorhanden ist, wird es bei uns
        gespielt. Zusätzlich veranstalten wir regelmässig Turniere und spielen
        mit unseren kompetitiven Teams in den entsprechenden Ligen.
      </p>
      <p>
        Hast du lust ein Teil unseres Clubs zu sein? Dann tritt unserem Discord
        bei!
      </p>
      <a
        href="https://discord.gg/UAWGz7gg5A"
        class="block mx-auto mt-2 md:mt-8 mb-8 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6"
      >
        <img src="join_discord.svg" alt="join discord" />
      </a>
    </section>
  )
})

export const head: DocumentHead = {
  title: 'OST ESports',
}
