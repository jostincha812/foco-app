import C from '../constants'

const AccessManager = {
  hasAccess: ({purchases = [], accessType = null, accessKey = null}) => {
    let hasAccess = false

    const fullAccessSet = new Set([
      C.IAP_EARLY_ADOPTER, C.IAP_FULL_ACCESS,
      C.IAP_PROFESSIONAL_5, C.IAP_PROFESSIONAL_10,
      C.IAP_PROFESSIONAL_15, C.IAP_PROFESSIONAL_20
    ])

    switch (accessType) {
      case C.ACCESS_PREMIUM_COLLECTION:
      case C.ACCESS_PREMIUM_FLASHCARD:
        purchases.map(purchase => {
          if (fullAccessSet.has(purchase)) {
            hasAccess = true
          }
        })
        break

      case C.ACCESS_CONSUMABLE_COLLECTION:
        hasAccess = true
        break

      case C.ACCESS_CONSUMABLE_FLASHCARD:
        hasAccess = true
        break

      default:
        hasAccess = true
    }

    return hasAccess
  }
}

Object.freeze(AccessManager)
export default AccessManager
