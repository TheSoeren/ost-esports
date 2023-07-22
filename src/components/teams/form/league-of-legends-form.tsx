import { component$, useTask$ } from '@builder.io/qwik'
import { Field, getValue, reset, setValue } from '@modular-forms/qwik'
import { TextInput } from '~/components/form'
import type { GameSpecificForm } from '~/types'

export default component$(({ of, edit }: GameSpecificForm) => {
  useTask$(({ track }) => {
    const plTeamId = track(() => getValue(of, 'gameSpecificData.plTeamId'))

    if (plTeamId === undefined || isNaN(plTeamId)) {
      setValue(of, 'gameSpecificData.plTeamId', undefined)
    }
  })

  useTask$(() => {
    if (edit) {
      // reset because initial value won't be displayed when form field is rendered too late
      reset(of)
    }
  })

  return (
    <Field of={of} name={'gameSpecificData.plTeamId'} type="number">
      {(field, props) => {
        return (
          <TextInput
            {...props}
            type="number"
            label="Primeleague Team-Id"
            value={field.value}
            error={field.error}
          />
        )
      }}
    </Field>
  )
})
