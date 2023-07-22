import { component$, useTask$ } from '@builder.io/qwik'
import { Field, getValue, setValue } from '@modular-forms/qwik'
import { TextInput } from '~/components/form'
import type { GameSpecificForm } from '~/types'

export default component$(({ of }: GameSpecificForm) => {
  useTask$(({ track }) => {
    const plTeamId = track(() => getValue(of, 'gameSpecificData.plTeamId'))

    if (plTeamId === undefined || isNaN(plTeamId)) {
      setValue(of, 'gameSpecificData.plTeamId', undefined)
    }
  })

  return (
    <Field of={of} name={'gameSpecificData.plTeamId'} type="number">
      {(field, props) => {
        console.log('Field Value', field.value)
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
