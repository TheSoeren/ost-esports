import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik'
import InputLabel from './input-label'
import InputError from './input-error'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import type {
  FieldElementProps,
  FieldPath,
  FieldValues,
} from '@modular-forms/qwik'

interface WysiwygProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> extends FieldElementProps<TFieldValues, TFieldName> {
  id?: string
  value: string | undefined
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
  <
    TFieldValues extends FieldValues,
    TFieldName extends FieldPath<TFieldValues>,
  >({
    label,
    value,
    error,
    onChange$,
    ...props
  }: WysiwygProps<TFieldValues, TFieldName>) => {
    const { name, required } = props
    const inputRef = useSignal<HTMLTextAreaElement>()

    // NOTE: Must use client-side only rendering because chkeditor uses the dom to register itself
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(async ({ cleanup }) => {
      if (!inputRef.value) {
        console.error(
          'Unable to bind WYSIWYG editor. Input element not present!'
        )
        return
      }

      const editor = await ClassicEditor.create(inputRef.value, {
        initialData: structuredClone(value),
        updateSourceElementOnDestroy: false,
      })

      editor.model.document.on('change', () => {
        const changeEvent = new Event(editor.getData())
        onChange$(changeEvent, inputRef.value!)
      })

      cleanup(() => {
        editor?.destroy()
      })
    })

    return (
      <div class={[error ? 'mb-3' : 'mb-6', 'prose max-w-none', props.class]}>
        <InputLabel name={name} label={label} required={required} />
        <textarea
          {...props}
          id={name}
          ref={inputRef}
          aria-invalid={!!error}
          aria-errormessage={`${name}-error`}
        />
        <InputError name={name} error={error} />
      </div>
    )
  }
)
