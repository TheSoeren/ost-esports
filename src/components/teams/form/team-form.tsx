import type { Component } from '@builder.io/qwik'
import {
  Resource,
  component$,
  useResource$,
  useStore,
  useTask$,
} from '@builder.io/qwik'
import { getValue, useForm, zodForm$ } from '@modular-forms/qwik'
import { z } from 'zod'
import { getGameSpecificForm } from '~/data/games/game-form-mapping'
import usePocketbase from '~/hooks/usePocketbase'
import type { Game, GameSpecificForm } from '~/types'
import { Collection } from '~/types'
import { Checkbox, Select, TextInput } from '../../form'
import type { SelectValue } from '../../form/select'
import EmptyGameForm from './empty-game-form'

export const teamSchema = z.object({
  name: z.string().min(1, 'Dieses Feld darf nicht leer sein!'),
  game: z.string().min(1, 'Dieses Feld darf nicht leer sein!'),
  gameSpecificData: z.object({
    plTeamId: z.number().optional(),
  }),
  hidden: z.boolean(),
})
export type TeamFormSchema = z.infer<typeof teamSchema>

interface TeamFormProps {
  onSubmit$(values: TeamFormSchema): void
}

export default component$(({ onSubmit$ }: TeamFormProps) => {
  const pb = usePocketbase()
  const gameSpecificForm = useStore<{
    element: Component<GameSpecificForm>
  }>({
    element: EmptyGameForm,
  })
  const gamesResource = useResource$<SelectValue[]>(async () => {
    const response: Game[] = await pb.collection(Collection.GAMES).getFullList()

    return response.map((game) => ({
      label: game.name,
      value: game.id,
    }))
  })

  const [teamForm, { Form, Field }] = useForm<TeamFormSchema>({
    loader: {
      value: {
        name: '',
        game: '',
        hidden: false,
        gameSpecificData: {
          plTeamId: undefined,
        },
      },
    },
    validate: zodForm$(teamSchema),
  })

  useTask$(async ({ track }) => {
    track(() => getValue(teamForm, 'game'))
    const game = getValue(teamForm, 'game')

    gameSpecificForm.element = await getGameSpecificForm(game)
  })

  return (
    <Form onSubmit$={onSubmit$}>
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
      <gameSpecificForm.element of={teamForm} />
      <Field name="hidden" type="boolean">
        {(field, props) => (
          <Checkbox {...props} label="Hidden" error={field.error} />
        )}
      </Field>
      <button type="submit" class="btn-outline block ml-auto">
        Save
      </button>
    </Form>
  )
})
