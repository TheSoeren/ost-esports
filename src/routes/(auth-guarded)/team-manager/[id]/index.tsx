import { $, component$, useContext } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import { Collection, type Team } from '~/types'
import Pocketbase from 'pocketbase'
import type { TeamFormSchema } from '~/components/teams/form/team-form'
import TeamForm from '~/components/teams/form/team-form'
import { AuthContext } from '~/contexts/AuthContext'
import { SnackbarContext } from '~/contexts/SnackbarContext'
import type { FormStore } from '@modular-forms/qwik'
import { reset } from '@modular-forms/qwik'

export const useTeam = routeLoader$<Team>(async (event) => {
  const pb = new Pocketbase(import.meta.env.VITE_API_URL)

  const teams = await pb
    .collection(Collection.TEAMS)
    .getOne<Team>(event.params.id)

  return structuredClone(teams)
})

export default component$(() => {
  const team = useTeam()
  const { authUser } = useContext(AuthContext)
  const { enqueueSnackbar } = useContext(SnackbarContext)

  const handleSubmit = $(
    async (values: TeamFormSchema, form: FormStore<any, undefined>) => {
      const qrlPb = new Pocketbase(import.meta.env.VITE_API_URL)

      try {
        if (!authUser.value) {
          throw new Error('Not authenticated!')
        }

        await qrlPb.collection(Collection.TEAMS).update(team.value.id, values)

        enqueueSnackbar({
          type: 'success',
          title: 'Team erfolgreich aktualisiert',
          duration: 3000,
        })
        reset(form, { initialValues: values })
      } catch (error: unknown) {
        enqueueSnackbar({
          type: 'error',
          title: 'Änderung fehlgeschlagen!',
          message:
            'Die Änderung konnte nicht durchgeführt werden. Versuchen Sie es später erneut.',
          duration: 3000,
        })
      }
    }
  )

  return (
    <section>
      <h1 class="dashboard-title">Team Bearbeiten</h1>
      <TeamForm team={team.value} onSubmit$={handleSubmit} edit />
    </section>
  )
})
