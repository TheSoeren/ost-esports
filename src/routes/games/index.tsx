import { component$ } from '@builder.io/qwik'

export default component$(() => {
  return (
    <>
      <div class="">
        <h1 class="game-title">GAMES</h1>
        <div class="game-all-widgets">
          <div class="game-widget bg-[url('../public/game_covers/leagueoflegends.jpg')]"></div>
          <div class="game-widget bg-[url('../public/game_covers/valorant.jpg')]"></div>
          <div class="game-widget bg-[url('../public/game_covers/rocketleague.jpg')]"></div>
          <div class="game-widget bg-[url('../public/game_covers/csgo.jpg')]"></div>
          <div class="game-widget bg-[url('../public/game_covers/overwatch.jpg')]"></div>
          <div class="game-widget bg-[url('../public/game_covers/fifa.jpg')]"></div>
        </div>
      </div>
    </>
  )
})
