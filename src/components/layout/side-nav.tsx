import {
  component$,
  useContext,
  useStore,
  useStyles$,
  useTask$,
} from '@builder.io/qwik'
import { Link, useLocation } from '@builder.io/qwik-city'
import {
  faImages,
  faNewspaper,
  faUser,
  faUsersRectangle,
} from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from 'qwik-fontawesome'
import { AuthContext, isUserObject } from '~/contexts/AuthContext'
import styles from '~/css/layout/side-nav.css?inline'
import type { UserRole } from '~/types'
import type { SideNavItem } from '~/types/navigation'

export const basicNavItems = [
  { label: 'Profil', href: '/profile', icon: faUser },
]

export const teamManagerNav = {
  label: 'Team Manager',
  href: '/team-manager',
  icon: faUsersRectangle,
}

export const newsManagerNav = {
  label: 'News Manager',
  href: '/news-manager',
  icon: faNewspaper,
}

export const galleryManager = {
  label: 'Galerie Manager',
  href: '/gallery-manager',
  icon: faImages,
}

export const navRoleMapping: Record<UserRole, SideNavItem[]> = {
  captain: [teamManagerNav],
  editor: [newsManagerNav, galleryManager],
}

export default component$(() => {
  useStyles$(styles)

  const navItems = useStore<SideNavItem[]>(structuredClone(basicNavItems))
  const { authenticated, authUser, logout } = useContext(AuthContext)
  const location = useLocation()

  const urlMatcher = (url: string) =>
    location.url.pathname.startsWith(url + '/')

  useTask$(({ track }) => {
    track(() => authenticated.value)

    let navRoleItems: SideNavItem[] = []
    if (isUserObject(authUser)) {
      navRoleItems = authUser.value.roles.flatMap(
        (role) => navRoleMapping[role]
      )
    }

    navItems.splice(0, navItems.length, ...basicNavItems, ...navRoleItems)
  })

  return (
    <>
      <button
        type="button"
        class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
      >
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside class="side-nav">
        <div class="side-nav__content">
          <Link href="/" aria-label="Site Overview" class="self-center mb-5">
            <img src="/logo_wide.webp" alt="OST ESports Logo" class="h-14" />
          </Link>
          {navItems.map((item, index) => (
            <Link
              href={item.href}
              class={[
                'side-nav__item',
                urlMatcher(item.href) ? 'side-nav__item--highlight' : '',
              ]}
              key={index}
            >
              <FaIcon icon={item.icon} class="w-6" />
              <span class="ml-2">{item.label}</span>
            </Link>
          ))}
          <button class="btn-outline mt-auto" onClick$={logout}>
            Ausloggen
          </button>
        </div>
      </aside>
    </>
  )
})
