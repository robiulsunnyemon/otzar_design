export type ScreenId =
  | 'splash'
  | 'onboarding'
  | 'pin'
  | 'dashboard'
  | 'scanner'
  | 'processing'
  | 'result'
  | 'fieldtest'
  | 'logging'
  | 'catalog'
  | 'map'
  | 'sync'
  | 'export'
  | 'profile'
  | 'help'

export interface ScreenProps {
  navigate: (s: ScreenId) => void
}
