import C from '../constants'

const AccessManager = {
  hasAccess: ({purchases = [], accessType = null, accessKey = null}) => {
    let hasAccess = false

    switch (accessType) {
      case C.ACCESS_PREMIUM_COLLECTION:
      case C.ACCESS_PREMIUM_FLASHCARD:
        purchases.map(purchase => {
          if (purchase === C.IAP_EARLY_ADOPTER ||
              purchase === C.IAP_FULL_ACCESS) {
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
