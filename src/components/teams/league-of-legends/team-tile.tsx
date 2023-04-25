import { component$, $, useStyles$ } from '@builder.io/qwik'
import type { Team } from '~/types'
import ImageMap from 'image-map'
import { useOnDocument } from '@builder.io/qwik'
import styles from '~/css/teams/lol-team-tile.css?inline'
import MapArea from './map-area'

// export function generateMap(items: string[]) {
//   return (
//     <>
//       {items.map((area, index) => (
//         <area key={index} coords={area} shape="poly" onClick$={} />
//       ))}
//     </>
//   )
// }

export default component$(({ name }: Team) => {
  useStyles$(styles)
  useOnDocument(
    'load',
    $(() => {
      ImageMap('img[usemap]')
    })
  )

  return (
    <div class="teams__tile">
      <div class="teams__name">{name}</div>
      <section class="overlay__wrapper">
        <img
          class="overlay__img"
          src="/lol/summoners-rift.png"
          useMap="#image-map"
        />
        <svg class="overlay__svg" width="174.65" height="177">
          <polygon
            points="35,303,38,117,46,84,87,42,136,28,316,32,316,0,94,0,57,15,33,36,12,75,1,121,1,303"
            style="fill:green; stroke:none;"
          />
        </svg>
      </section>
      {/* <map name="image-map">
        <MapArea
          coordinates="35,303,38,117,46,84,87,42,136,28,316,32,316,0,94,0,57,15,33,36,12,75,1,121,1,303"
          onMouseEnter={$(() => {
            console.log('enter')
          })}
          onMouseLeave={$(() => {
            console.log('leave')
          })}
        />
        <MapArea
          coordinates="93,318,119,345,359,120,328,92"
          onMouseEnter={$(() => {
            console.log('enter')
          })}
          onMouseLeave={$(() => {
            console.log('leave')
          })}
        />
        <MapArea
          coordinates="113,291,39,276,43,114,48,91,61,73,79,54,102,43,139,35,290,35,304,107"
          onMouseEnter={$(() => {
            console.log('enter')
          })}
          onMouseLeave={$(() => {
            console.log('leave')
          })}
        />
        <MapArea
          coordinates="337,144,411,164,403,346,345,398,172,397,149,325"
          onMouseEnter={$(() => {
            console.log('enter')
          })}
          onMouseLeave={$(() => {
            console.log('leave')
          })}
        />
        <MapArea
          coordinates="133,408,349,407,368,392,408,353,416,132,452,134,450,305,444,352,432,384,409,410,386,427,359,445,133,445"
          onMouseEnter={$(() => {
            console.log('enter')
          })}
          onMouseLeave={$(() => {
            console.log('leave')
          })}
        />
      </map> */}
    </div>
  )
})
