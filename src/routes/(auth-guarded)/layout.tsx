import { component$, Slot, useStylesScoped$ } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import LoadingBar from '~/components/layout/loading-bar'
import SideNav from '~/components/layout/side-nav'
import styles from '~/css/layout/guarded-layout.css?inline'
import { basicNavItems, navRoleMapping } from '~/data/navigation/side-nav'
import { getEdgePbInstance } from '~/services/pocketbase-service'
import type { UserRole } from '~/types'
import type { SideNavItem } from '~/types/navigation'

export const useNavItems = routeLoader$<SideNavItem[]>(
  async ({ cookie, redirect, pathname }) => {
    const pb = getEdgePbInstance(cookie)

    if (!pb.authStore.isValid) {
      throw redirect(302, `/login?redirect=${pathname}`)
    }

    const authRecord = pb.authStore.record
    if (!authRecord) {
      return []
    }

    const roleBasedNavItems = authRecord.roles.flatMap(
      (role: UserRole) => navRoleMapping[role]
    )
    return [...basicNavItems, ...roleBasedNavItems]
  }
)

export default component$(() => {
  useStylesScoped$(styles)

  const navItems = useNavItems()

  return (
    <>
      <LoadingBar />
      <section class="guarded">
        <SideNav navItems={navItems.value} />
        <main class="guarded-content">
          <Slot />
        </main>
      </section>
    </>
  )
})
