import { component$ } from '@builder.io/qwik'
import ImgDiscord from '~/media/discord.webp?jsx'

export default component$(() => {
  return (
    <article class="container mx-auto flex flex-col gap-4 my-3">
      <h1 class="text-2xl font-bold">Wir sind Ost eSports</h1>
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
        Hast du lust ein Teil unseres Clubs zu sein? Dann tritt unserem&nbsp;
        <a
          href="https://discord.gg/UAWGz7gg5A"
          target="_blank"
          class="text-blue-600 dark:text-blue-500 hover:underline"
        >
          Discord
          <ImgDiscord alt="join discord" class="inline-block w-5 ml-1 mr-2" />
        </a>
        bei!
      </p>
    </article>
  )
})
