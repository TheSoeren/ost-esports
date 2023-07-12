import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export interface NavItem {
  label: string
  href: string
}

export interface SideNavItem extends NavItem {
  icon: IconDefinition
}
