import { $, Resource, component$, useResource$ } from '@builder.io/qwik'
import type { FormStore } from '@modular-forms/qwik'
import { setValue, useForm, zodForm$ } from '@modular-forms/qwik'
import { z } from 'zod'
import usePocketbase from '~/hooks/usePocketbase'
import type { NewsEntry, User } from '~/types'
import { Collection } from '~/types'
import { Checkbox, Select, TextInput } from '../form'
import type { SelectValue } from '../form/select'
import TextArea from '../form/text-area'
import Wysiwyg from '../form/wysiwyg'

export const newsSchema = z.object({
  title: z
    .string()
    .min(5, 'Titel muss mindestens 5 Zeichen lang sein!')
    .max(50, 'Titel kann maximal 50 Zeichen lang sein!'),
  teaser: z.string().max(500, 'Teaser kann maximal 500 Zeichen lang sein!'),
  content: z.string().min(1, 'Bericht darf nicht leer sein!'),
  author: z.string().optional(),
  publishDate: z.string().min(1, 'Publizierdatum muss angegeben werden!'),
  hidden: z.boolean(),
})
export type NewsFormSchema = z.infer<typeof newsSchema>

interface NewsFormProps {
  newsEntry?: NewsEntry
  edit?: boolean
  onSubmit$(
    values: NewsFormSchema,
    form: FormStore<NewsFormSchema, undefined>
  ): void
  onDelete$?(): void
}

export default component$(
  ({ newsEntry, edit, onSubmit$, onDelete$ }: NewsFormProps) => {
    const pb = usePocketbase()
    const initialValues = newsEntry
      ? { ...newsEntry, publishDate: newsEntry.publishDate.split(' ')[0] }
      : {
          title: '',
          teaser: '',
          content: '',
          author: '',
          publishDate: '',
          hidden: false,
        }

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

    const [newsForm, { Form, Field }] = useForm<NewsFormSchema>({
      loader: {
        value: initialValues,
      },
      validate: zodForm$(newsSchema),
    })

    const submitHandler$ = $((values: NewsFormSchema) => {
      onSubmit$(values, newsForm)
    })

    return (
      <Form onSubmit$={submitHandler$}>
        <Field name="title" type="string">
          {(field, props) => (
            <TextInput
              {...props}
              type="text"
              label="Titel"
              value={field.value}
              error={field.error}
              required
            />
          )}
        </Field>
        {edit && (
          <Field name="author" type="string">
            {(field, props) => (
              <Resource
                value={usersResource}
                onRejected={(error) => <>Error: {error.message}</>}
                onResolved={(users) => (
                  <Select
                    {...props}
                    label="Author"
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
        <Field name="teaser">
          {(field, props) => (
            <TextArea
              {...props}
              rows={3}
              class="resize-none"
              label="Teaser"
              value={field.value}
              error={field.error}
              required
            />
          )}
        </Field>
        <Field name="content">
          {(field, props) => (
            <Wysiwyg
              {...props}
              onChange$={(data) => {
                setValue(newsForm, 'content', data)
              }}
              label="Bericht"
              value={field.value}
              error={field.error}
              required
            />
          )}
        </Field>
        <Field name="publishDate">
          {(field, props) => (
            <TextInput
              {...props}
              type="date"
              label="Veröffentlichen am"
              value={field.value}
              error={field.error}
              required
            />
          )}
        </Field>
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
              disabled={newsForm.dirty}
              onClick$={onDelete$}
            >
              Löschen
            </button>
          )}
          <button
            type="submit"
            class="btn-outline block"
            disabled={newsForm.submitting || !newsForm.dirty}
          >
            Speichern
          </button>
        </section>
      </Form>
    )
  }
)
