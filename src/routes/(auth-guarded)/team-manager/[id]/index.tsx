import { $, component$, useContext } from '@builder.io/qwik'
import { routeLoader$, useNavigate } from '@builder.io/qwik-city'
import { type Team } from '~/types'
import type { TeamFormSchema } from '~/components/teams/form/team-form'
import TeamForm from '~/components/teams/form/team-form'
import { SnackbarContext } from '~/contexts/snackbar-context'
import type { FormStore } from '@modular-forms/qwik'
import { reset } from '@modular-forms/qwik'
import { getEdgePbInstance } from '~/services/pocketbase-service'
import { deleteTeam, getTeamById, updateTeam } from '~/services/team-service'

export const useTeam = routeLoader$<Team>(async ({ params, cookie }) => {
  const pb = getEdgePbInstance(cookie)
  return getTeamById(params.id, pb)
})

export default component$(() => {
  const team = useTeam()
  const { enqueueSnackbar } = useContext(SnackbarContext)
  const navigate = useNavigate()

  const handleSubmit$ = $(
    async (values: TeamFormSchema, form: FormStore<any, undefined>) => {
      try {
        await updateTeam(team.value.id, values)

        enqueueSnackbar({
          type: 'success',
          title: 'Team erfolgreich aktualisiert',
          duration: 3000,
        })
        reset(form, { initialValues: values })
      } catch (error: unknown) {
        console.error(error)
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

  const handleDelete$ = $(async () => {
    try {
      await deleteTeam(team.value.id)

      enqueueSnackbar({
        type: 'success',
        title: 'Team erfolgreich gelöscht',
        duration: 3000,
      })
      navigate('/team-manager')
    } catch (error: unknown) {
      console.error(error)
      enqueueSnackbar({
        type: 'error',
        title: 'Löschen fehlgeschlagen!',
        message:
          'Das Team konnte nicht gelöscht werden. Versuchen Sie es später erneut.',
        duration: 3000,
      })
    }
  })

  return (
    <section>
      <h1 class="dashboard-title">Team Bearbeiten</h1>
      <TeamForm
        team={team.value}
        onSubmit$={handleSubmit$}
        onDelete$={handleDelete$}
        edit
      />
    </section>
  )
})
