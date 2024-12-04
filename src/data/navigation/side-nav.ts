import {
  faImages,
  faNewspaper,
  faUser,
  faUsersRectangle,
} from '@fortawesome/free-solid-svg-icons'
import type { SideNavItem } from '~/types/navigation'
import type { UserRole } from '~/types/user'

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
