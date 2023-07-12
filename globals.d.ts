interface HSOverlay extends Window {
  open($modalEl: HTMLElement): void
  close($modalEl: HTMLElement): void
  toggle($modalEl: HTMLElement): void
}

declare var HSOverlay: HSOverlay
