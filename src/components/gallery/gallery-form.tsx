import type { NoSerialize } from '@builder.io/qwik'
import {
  $,
  Resource,
  component$,
  noSerialize,
  useResource$,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik'
import { required, reset, useForm } from '@modular-forms/qwik'
import usePocketbase from '~/hooks/usePocketbase'
import type { Gallery, User } from '~/types'
import { Collection } from '~/types'
import { Checkbox, Select, TextInput } from '../form'
import FileInput from '../form/file-input'
import type { SelectValue } from '../form/select'

export type GalleryFormSchema = {
  name: string
  coverImage: NoSerialize<File | Blob>
  images: NoSerialize<(File | Blob)[]>
  creator: string
  hidden: boolean
}

interface GalleryFormProps {
  gallery?: Gallery
  edit?: boolean
  onSubmit$(values: FormData): void
  onDelete$?(): void
}

export default component$(
  ({ gallery, edit, onSubmit$, onDelete$ }: GalleryFormProps) => {
    const pb = usePocketbase()

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

    const initialValues = {
      name: '',
      coverImage: undefined,
      images: noSerialize([]),
      creator: '',
      hidden: false,
    }

    const formLoader = useSignal<GalleryFormSchema>(initialValues)
    const [galleryForm, { Form, Field }] = useForm<GalleryFormSchema>({
      loader: formLoader,
    })

    useVisibleTask$(async () => {
      if (!gallery) {
        return
      }

      const coverImageRes = await fetch(gallery.coverImage)
      const coverImage = await coverImageRes.blob()

      const imagesRes = await Promise.all(
        gallery.images.map((imageUrl) => fetch(imageUrl))
      )
      const images = await Promise.all(
        imagesRes.map((imageRes) => imageRes.blob())
      )

      reset(galleryForm, {
        initialValues: {
          ...gallery,
          coverImage: noSerialize(coverImage),
          images: noSerialize(images),
        },
      })
    })

    const submitHandler$ = $((values: GalleryFormSchema) => {
      const formData = new FormData()
      formData.append('coverImage', values.coverImage as Blob)
      formData.append('name', values.name)
      formData.append('hidden', values.hidden.toString())

      const newUploads = values.images!.some((image) => image instanceof File)
      if (newUploads) {
        values.images!.forEach((image) => {
          formData.append('images', image as Blob)
        })
      }

      if (edit) {
        formData.append('creator', values.creator)
        reset(galleryForm, { initialValues: values })
      }

      onSubmit$(formData)
    })

    return (
      <Form onSubmit$={submitHandler$}>
        <Field
          name="name"
          type="string"
          validate={[required('Galeriename darf nicht leer sein!')]}
        >
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
          <Field name="creator" type="string">
            {(field, props) => (
              <Resource
                value={usersResource}
                onRejected={(error) => <>Error: {error.message}</>}
                onResolved={(users) => (
                  <Select
                    {...props}
                    label="Ersteller"
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
        <Field
          name="coverImage"
          type="File"
          validate={[required('Titelbild darf nicht leer sein!')]}
        >
          {(field, props) => (
            <FileInput
              {...props}
              value={field.value}
              error={field.error}
              label="Titelbild"
              accept="image/*"
            />
          )}
        </Field>
        <Field name="images" type="File[]">
          {(field, props) => (
            <FileInput
              {...props}
              // @ts-ignore -> https://github.com/fabian-hiller/modular-forms/blob/a998aa6a348059e72d420eecace76ad4d6f5ac92/playgrounds/qwik/src/routes/(default)/special/index.tsx#L153
              value={field.value}
              error={field.error}
              label="Bilder"
              accept="image/*"
              multiple
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
              disabled={galleryForm.dirty}
              onClick$={onDelete$}
            >
              Löschen
            </button>
          )}
          <button
            type="submit"
            class="btn-outline block"
            disabled={galleryForm.submitting || !galleryForm.dirty}
          >
            Speichern
          </button>
        </section>
      </Form>
    )
  }
)
