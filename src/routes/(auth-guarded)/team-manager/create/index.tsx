import {
  $,
  Resource,
  component$,
  useResource$,
  useStore,
  useTask$,
} from '@builder.io/qwik'
import { getValue, useForm, zodForm$ } from '@modular-forms/qwik'
import { z } from 'zod'
import { Checkbox, Select, TextInput } from '~/components/form'
import type { SelectValue } from '~/components/form/select'
import NewsTileSkeleton from '~/components/news/news-tile-skeleton'
import TeamManagerSkeleton from '~/components/teams/team-manager-skeleton'
import { LEAGUE_OF_LEGENDS } from '~/data/games/game-id'
import usePocketbase from '~/hooks/usePocketbase'
import type { Game } from '~/types'
import { Collection } from '~/types'

export const teamSchema = z.object({
  name: z.string().min(1, 'Dieses Feld darf nicht leer sein!'),
  game: z.string().min(1, 'Dieses Feld darf nicht leer sein!'),
  hidden: z.boolean(),
})
export type TeamForm = z.infer<typeof teamSchema>

export const gameFormMapping = {
  [LEAGUE_OF_LEGENDS]: NewsTileSkeleton,
}

export const isKeyOfGameFormMapping = (
  gameId: string
): gameId is keyof typeof gameFormMapping => {
  if (gameId in gameFormMapping) {
    return true
  }

  return false
}

export default component$(() => {
  const pb = usePocketbase()
  const gamesResource = useResource$<SelectValue[]>(async () => {
    const response: Game[] = await pb.collection(Collection.GAMES).getFullList()

    return response.map((game) => ({
      label: game.name,
      value: game.id,
    }))
  })

  const [teamForm, { Form, Field }] = useForm<TeamForm>({
    loader: {
      value: {
        name: '',
        game: '',
        hidden: false,
      },
    },
    validate: zodForm$(teamSchema),
  })

  const gameSpecificForm = useStore({ element: TeamManagerSkeleton })
  useTask$(({ track }) => {
    track(() => getValue(teamForm, 'game'))
    const game = getValue(teamForm, 'game')

    if (game && isKeyOfGameFormMapping(game)) {
      gameSpecificForm.element = gameFormMapping[game]
    } else {
      gameSpecificForm.element = TeamManagerSkeleton
    }
  })

  const handleSubmit = $(async (values: TeamForm) => {
    console.log('SUBMIT', values)
  })

  return (
    <section>
      <h1 class="dashboard-title">Team Erstellen</h1>
      <Form onSubmit$={handleSubmit}>
        <Field name="name" type="string">
          {(field, props) => (
            <TextInput
              {...props}
              type="text"
              label="Name"
              value={field.value}
              error={field.error}
              required
            />
          )}
        </Field>
        <Field name="game">
          {(field, props) => (
            <Resource
              value={gamesResource}
              onRejected={(error) => <>Error: {error.message}</>}
              onResolved={(games) => (
                <Select
                  {...props}
                  label="Game"
                  value={field.value}
                  error={field.error}
                  options={games}
                  required
                />
              )}
            />
          )}
        </Field>
        <gameSpecificForm.element />
        <Field name="hidden" type="boolean">
          {(field, props) => (
            <Checkbox {...props} label="Hidden" error={field.error} />
          )}
        </Field>
        <button type="submit" class="btn-outline block ml-auto">
          Save
        </button>
      </Form>
    </section>
  )
})
