import { component$, useStylesScoped$ } from '@builder.io/qwik'
import type { PlMatch } from '~/types/primeleague'
import dayjs from 'dayjs'
import styles from '~/css/teams/pl-matches.css?inline'

interface Props {
  matches: PlMatch[]
  cssClass?: string
  teamName?: string
}

export function sortByMatchDay(a: PlMatch, b: PlMatch) {
  return a.match_day - b.match_day
}

export function hasWon(result: string) {
  // parsing stops after first invalid character -> 2:0 will result in 2; 0:2 will result in 0
  return !!parseInt(result)
}

export default component$(({ matches, cssClass, teamName }: Props) => {
  useStylesScoped$(styles)

  const resultClass = (result: string | null) => {
    if (!result) {
      return 'pl-match--black'
    }

    if (hasWon(result)) {
      return 'pl-match--pink'
    }

    return 'pl-match--violet'
  }

  return (
    <section class={['pl-match__list', cssClass]}>
      {matches.sort(sortByMatchDay).map((match) => {
        return (
          <a
            key={match.match_id}
            href={match.prime_league_link}
            target="_blank"
            class={['pl-match', resultClass(match.result)]}
          >
            <div class="pl-match__enemy">
              {teamName} vs. {match.enemy_team.name}
            </div>
            <div class="pl-match__info">
              {match.result
                ? match.result
                : dayjs(match.begin).format('DD.MM.YYYY HH:mm')}
            </div>
          </a>
        )
      })}
    </section>
  )
})
