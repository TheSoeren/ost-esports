import type { IStaticMethods } from 'preline/preline'

interface HSOverlay extends Window {
  open($modalEl: HTMLElement): void
  close($modalEl: HTMLElement): void
  toggle($modalEl: HTMLElement): void
}

declare global {
  interface Window {
    HSOverlay: HSOverlay
    HSStaticMethods: IStaticMethods
  }
}
