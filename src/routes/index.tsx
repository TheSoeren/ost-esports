import {
  Resource,
  component$,
  useResource$,
  useStylesScoped$,
} from '@builder.io/qwik'
import { type DocumentHead } from '@builder.io/qwik-city'
import NewsTile from '~/components/news/news-tile'
import NewsTileSkeleton from '~/components/news/news-tile-skeleton'
import PlMatchList from '~/components/teams/league-of-legends/pl-match-list'
import pb from '~/pocketbase'
import type { NewsEntry } from '~/types'
import styles from '~/css/index.css?inline'
import { useTeamData } from './layout'

export default component$(() => {
  useStylesScoped$(styles)

  const teamResource = useTeamData()
  const newsResource = useResource$<NewsEntry>(async () => {
    const response = await pb
      .collection('news')
      .getFirstListItem<NewsEntry>('', {
        sort: '-publishDate',
      })

    return structuredClone(response)
  })

  return (
    <article class="home-page">
      <Resource
        value={newsResource}
        onPending={() => <NewsTileSkeleton />}
        onRejected={(error) => <>Error: {error.message}</>}
        onResolved={(news) => <NewsTile {...news} />}
      />
      <div class="match-section">
        {teamResource.value?.gameSpecificData.map((plTeam) => (
          <>
            <div key={plTeam.id} class="tile match-section__tile">
              <h2 class="text-2xl mb-4">Spiele von {plTeam.name}</h2>
              <PlMatchList matches={plTeam.matches} />
            </div>
          </>
        ))}
      </div>
    </article>
  )
})

export const head: DocumentHead = {
  title: 'OST eSports',
}
