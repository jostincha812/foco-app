import C from '../constants'

export const UserDefaults = {
  level: C.WSET3,
  // TODO remove after android IAP is sorted
  purchases: [ C.IAP_EARLY_ADOPTER ],
  // purchases: [ C.IAP_FREE_ACCESS ],
  roles: [ C.ROLE_USER ],
}
