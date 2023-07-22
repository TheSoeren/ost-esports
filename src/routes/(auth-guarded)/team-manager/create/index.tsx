import { $, component$, useContext } from '@builder.io/qwik'
import type { TeamFormSchema } from '~/components/teams/form/team-form'
import TeamForm from '~/components/teams/form/team-form'
import Pocketbase from 'pocketbase'
import { AuthContext } from '~/contexts/AuthContext'
import { Collection } from '~/types'
import { SnackbarContext } from '~/contexts/SnackbarContext'

export default component$(() => {
  const { authUser } = useContext(AuthContext)
  const { enqueueSnackbar } = useContext(SnackbarContext)

  const handleSubmit = $(async (values: TeamFormSchema) => {
    const qrlPb = new Pocketbase(import.meta.env.VITE_API_URL)

    try {
      if (!authUser.value) {
        throw new Error('Not authenticated!')
      }

      await qrlPb.collection(Collection.TEAMS).create({
        ...values,
        captain: authUser.value.id,
      })
    } catch (error: unknown) {
      enqueueSnackbar({
        type: 'error',
        title: 'Änderung fehlgeschlagen!',
        message:
          'Die Änderung konnte nicht durchgeführt werden. Versuchen Sie es später erneut.',
        duration: 3000,
      })
    }
  })

  return (
    <section>
      <h1 class="dashboard-title">Team Erstellen</h1>
      <TeamForm onSubmit$={handleSubmit} />
    </section>
  )
})
