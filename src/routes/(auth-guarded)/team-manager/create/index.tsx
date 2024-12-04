import { $, component$, useContext } from '@builder.io/qwik'
import type { TeamFormSchema } from '~/components/teams/form/team-form'
import TeamForm from '~/components/teams/form/team-form'
import { AuthContext } from '~/contexts/auth-context'
import { SnackbarContext } from '~/contexts/snackbar-context'
import { useNavigate } from '@builder.io/qwik-city'
import { createTeam } from '~/services/team-service'

export default component$(() => {
  const { authUser } = useContext(AuthContext)
  const { enqueueSnackbar } = useContext(SnackbarContext)
  const navigate = useNavigate()

  const handleSubmit$ = $(async (values: TeamFormSchema) => {
    try {
      if (!authUser.value) {
        throw new Error('Not authenticated!')
      }

      const team = await createTeam({
        ...values,
        captain: authUser.value.id,
      })

      enqueueSnackbar({
        type: 'success',
        title: 'Team erfolgreich erstellt',
        duration: 3000,
      })
      navigate(`/team-manager/${team.id}`)
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
  })

  return (
    <section>
      <h1 class="dashboard-title">Team Erstellen</h1>
      <TeamForm onSubmit$={handleSubmit$} />
    </section>
  )
})
