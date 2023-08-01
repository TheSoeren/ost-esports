import {
  component$,
  useStore,
  useTask$,
  type NoSerialize,
  type PropFunction,
  type QwikChangeEvent,
  type QwikFocusEvent,
} from '@builder.io/qwik'
import InputError from './input-error'
import InputLabel from './input-label'

type FileInputProps = {
  ref: PropFunction<(element: Element) => void>
  name: string
  value:
    | NoSerialize<File | Blob>
    | NoSerialize<File | Blob>[]
    | null
    | undefined
  onInput$: PropFunction<(event: Event, element: HTMLInputElement) => void>
  onChange$: PropFunction<
    (
      event: QwikChangeEvent<HTMLInputElement>,
      element: HTMLInputElement
    ) => void
  >
  onBlur$: PropFunction<
    (event: QwikFocusEvent<HTMLInputElement>, element: HTMLInputElement) => void
  >
  accept?: string
  required?: boolean
  multiple?: boolean
  class?: string
  label?: string
  error?: string
}

/**
 * File input field that users can click or drag files into. Various
 * decorations can be displayed in or around the field to communicate the entry
 * requirements.
 */
export default component$(
  ({ value, label, error, ...props }: FileInputProps) => {
    const { name, required, multiple } = props

    // Create computed value of selected files
    const store = useStore<{ images: NoSerialize<File | Blob>[] }>({
      images: [],
    })
    useTask$(({ track }) => {
      track(() => value)

      store.images = value ? (Array.isArray(value) ? value : [value]) : []
    })

    return (
      <div class={[error ? 'mb-3' : 'mb-6', props.class]}>
        <InputLabel name={name} label={label} required={required} />
        <div class={['flex', multiple ? 'flex-col' : 'flex-row']}>
          <label
            class={[
              'relative flex min-h-[30px] w-full items-center justify-center rounded-2xl border-[3px]',
              'text-slate-500 border-dashed p-8 text-center hover:border-slate-300 md:text-lg lg:text-xl',
              error ? 'border-red-600/50' : 'border-slate-200',
            ]}
          >
            {store.images.length
              ? `${store.images.length} Datei${multiple ? 'en' : ''} ausgewählt`
              : `Klicken oder per Drag & Drop Datei${
                  multiple ? 'en' : ''
                } hochladen`}
            <input
              {...props}
              class="absolute h-full w-full cursor-pointer opacity-0"
              type="file"
              id={name}
              aria-invalid={!!error}
              aria-errormessage={`${name}-error`}
            />
          </label>
          <div class={[multiple ? 'columns-6 gap-4 mt-3' : 'ml-2']}>
            {store.images.map((file, index) => {
              const src = URL.createObjectURL(file as Blob)
              return (
                <img
                  key={index}
                  src={src}
                  class={[
                    multiple ? 'my-2 mx-auto' : 'object-contain max-h-64',
                  ]}
                />
              )
            })}
          </div>
        </div>
        <InputError name={name} error={error} />
      </div>
    )
  }
)
