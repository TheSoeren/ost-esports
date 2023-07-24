import type { Component } from '@builder.io/qwik'
import {
  $,
  Resource,
  component$,
  useResource$,
  useStore,
  useTask$,
} from '@builder.io/qwik'
import type { FormStore } from '@modular-forms/qwik'
import { getValue, useForm, zodForm$ } from '@modular-forms/qwik'
import { z } from 'zod'
import { getGameSpecificForm } from '~/data/games/game-form-mapping'
import usePocketbase from '~/hooks/usePocketbase'
import type { Game, GameSpecificForm, Team, User } from '~/types'
import { Collection } from '~/types'
import { Checkbox, Select, TextInput } from '../../form'
import type { SelectValue } from '../../form/select'
import EmptyGameForm from './empty-game-form'

export const teamSchema = z.object({
  name: z.string().min(1, 'Teamname darf nicht leer sein!'),
  captain: z.string().optional(),
  game: z.string().min(1, 'Dieses Feld darf nicht leer sein!'),
  gameSpecificData: z.object({
    plTeamId: z.number().optional(),
  }),
  hidden: z.boolean(),
})
export type TeamFormSchema = z.infer<typeof teamSchema>

interface SubformObject {
  element: Component<GameSpecificForm>
}

interface TeamFormProps {
  team?: Team
  edit?: boolean
  onSubmit$(
    values: TeamFormSchema,
    form: FormStore<TeamFormSchema, undefined>
  ): void
  onDelete$?(): void
}

export default component$(
  ({ team, edit, onSubmit$, onDelete$ }: TeamFormProps) => {
    const pb = usePocketbase()
    const gameSpecificForm = useStore<SubformObject>({
      element: EmptyGameForm,
    })
    const gamesResource = useResource$<SelectValue[]>(async () => {
      const response: Game[] = await pb
        .collection(Collection.GAMES)
        .getFullList()

      return response.map((game) => ({
        label: game.name,
        value: game.id,
      }))
    })

    const usersResource = useResource$<SelectValue[]>(async () => {
      if (!edit) return []

      const response: User[] = await pb
        .collection(Collection.USERS)
        .getFullList()

      return response.map((user) => ({
        label: user.gamertag ? user.gamertag : user.username,
        value: user.id,
      }))
    })

    const [teamForm, { Form, Field }] = useForm<TeamFormSchema>({
      loader: {
        value: team ?? {
          name: '',
          captain: '',
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

    const submitHandler$ = $((values: TeamFormSchema) => {
      onSubmit$(values, teamForm)
    })

    return (
      <Form onSubmit$={submitHandler$}>
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
        {edit && (
          <Field name="captain" type="string">
            {(field, props) => (
              <Resource
                value={usersResource}
                onRejected={(error) => <>Error: {error.message}</>}
                onResolved={(users) => (
                  <Select
                    {...props}
                    label="Captain"
                    value={field.value}
                    error={field.error}
                    options={users}
                    required
                  />
                )}
              />
            )}
          </Field>
        )}
        <Field name="game">
          {(field, props) => (
            <Resource
              value={gamesResource}
              onRejected={(error) => <>Error: {error.message}</>}
              onResolved={(games) => (
                <Select
                  {...props}
                  label="Spiel"
                  value={field.value}
                  error={field.error}
                  options={games}
                  required
                />
              )}
            />
          )}
        </Field>
        <gameSpecificForm.element of={teamForm} edit={edit} />
        <Field name="hidden" type="boolean">
          {(field, props) => (
            <Checkbox
              {...props}
              label="Versteckt"
              checked={field.value}
              error={field.error}
            />
          )}
        </Field>
        <section class="flex justify-end gap-2 items-center">
          {edit && (
            <button
              type="button"
              class="btn-link"
              disabled={teamForm.dirty}
              onClick$={onDelete$}
            >
              Löschen
            </button>
          )}
          <button
            type="submit"
            class="btn-outline block"
            disabled={teamForm.submitting || !teamForm.dirty}
          >
            Speichern
          </button>
        </section>
      </Form>
    )
  }
)
