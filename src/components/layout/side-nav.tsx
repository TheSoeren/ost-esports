import { $, component$, useStyles$ } from '@builder.io/qwik'
import { Link, useLocation, useNavigate } from '@builder.io/qwik-city'
import { FaIcon } from 'qwik-fontawesome'
import styles from '~/css/layout/side-nav.css?inline'
import type { SideNavItem } from '~/types/navigation'
import ImgLogoWide from '~/media/logo_wide.webp?jsx'
import { logout } from '~/services/user-service'

interface SideNavProps {
  navItems: SideNavItem[]
}

export default component$(({ navItems }: SideNavProps) => {
  useStyles$(styles)

  const navigate = useNavigate()
  const location = useLocation()

  const urlMatcher = (url: string) =>
    location.url.pathname.startsWith(url + '/')

  const handleLogout = $(() => {
    logout()
    navigate('/')
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
            <ImgLogoWide alt="OST ESports Logo" class="h-14 w-auto" />
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
          <button class="btn-outline mt-auto" onClick$={handleLogout}>
            Ausloggen
          </button>
        </div>
      </aside>
    </>
  )
})
