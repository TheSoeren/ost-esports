import { $, component$, noSerialize } from '@builder.io/qwik'
import { useForm, zodForm$ } from '@modular-forms/qwik'
import { z } from 'zod'
import { Checkbox, Select, TextInput } from '~/components/form'

export const teamSchema = z.object({
  name: z.string().min(1, 'Dieses Feld darf nicht leer sein!'),
  game: z.string().min(1, 'Dieses Feld darf nicht leer sein!'),
  hidden: z.boolean(),
})
export type TeamForm = z.infer<typeof teamSchema>

export default component$(() => {
  const [, { Form, Field }] = useForm<TeamForm>({
    loader: {
      value: {
        name: '',
        game: '',
        hidden: false,
      },
    },
    validate: zodForm$(teamSchema),
  })
  noSerialize(Field)

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
            <Select
              {...props}
              label="Game"
              value={field.value}
              error={field.error}
              options={[
                { label: 'Option 1', value: 'option_1' },
                { label: 'Option 2', value: 'option_2' },
                { label: 'Option 3', value: 'option_3' },
              ]}
              required
            />
          )}
        </Field>
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
