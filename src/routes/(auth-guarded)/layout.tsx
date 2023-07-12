import {
  component$,
  Slot,
  useContext,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik'
import { useNavigate } from '@builder.io/qwik-city'
import LoadingBar from '~/components/layout/loading-bar'
import SideNav from '~/components/layout/side-nav'
import { AuthContext } from '~/contexts/AuthContext'
import { SnackbarContext } from '~/contexts/SnackbarContext'
import styles from '~/css/layout/guarded-layout.css?inline'

export default component$(() => {
  useStylesScoped$(styles)

  const { authenticated } = useContext(AuthContext)
  const { enqueueSnackbar } = useContext(SnackbarContext)
  const navigate = useNavigate()

  /*
   * This task results in any logout within auth-guard to throw an error snackbar...
   */
  useVisibleTask$(({ track }) => {
    track(() => authenticated.value)

    if (!authenticated.value) {
      enqueueSnackbar({
        type: 'error',
        title: 'Zugriff Verhindert!',
        message:
          'Dieser Bereich kann nur von authentifizierten Benutzern besucht werden.',
        duration: 3000,
      })
      navigate('/')
    }
  })

  return (
    <>
      <LoadingBar />
      <section class="guarded">
        <SideNav />
        <main class="guarded-content">
          <Slot />
        </main>
      </section>
    </>
  )
})
