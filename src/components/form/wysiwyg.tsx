import type { PropFunction, QwikFocusEvent } from '@builder.io/qwik'
import { component$, useVisibleTask$ } from '@builder.io/qwik'
import InputLabel from './input-label'
import InputError from './input-error'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

interface WysiwygProps {
  id?: string
  ref: PropFunction<(element: Element) => void>
  name: string
  value: string | undefined
  onInput$: PropFunction<(event: Event, element: HTMLTextAreaElement) => void>
  onChange$: PropFunction<(data: string) => void>
  onBlur$: PropFunction<
    (
      event: QwikFocusEvent<HTMLTextAreaElement>,
      element: HTMLTextAreaElement
    ) => void
  >
  placeholder?: string
  required?: boolean
  class?: string
  label?: string
  error?: string
  form?: string
  rows?: number
  cols?: number
  disabled?: boolean
  readOnly?: boolean
}

export default component$(
  ({ label, value, error, onChange$, ...props }: WysiwygProps) => {
    const { name, required } = props

    useVisibleTask$(async ({ cleanup }) => {
      const element: HTMLElement | null = document.querySelector(`#${name}`)
      let editor: ClassicEditor

      if (element) {
        editor = await ClassicEditor.create(element, {
          initialData: structuredClone(value),
          updateSourceElementOnDestroy: false,
        })

        editor.model.document.on('change', () => {
          onChange$(editor.getData())
        })
      }

      cleanup(() => {
        if (editor) {
          editor.destroy()
        }
      })
    })

    return (
      <div class={[error ? 'mb-3' : 'mb-6', 'prose max-w-none', props.class]}>
        <InputLabel name={name} label={label} required={required} />
        <textarea
          {...props}
          id={name}
          aria-invalid={!!error}
          aria-errormessage={`${name}-error`}
        />
        <InputError name={name} error={error} />
      </div>
    )
  }
)
