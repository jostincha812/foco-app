import C from '../constants'
import Store from '../iap/Store'

const AccessManager = {
  // Params:
  // - accessType - string representing access type required - ie. ACCESS_PREMIUM_COLLECTION, ACCESS_CONSUMERABLE_FLASHCARDS
  // - accessKey - key string representing content identifier
  // - purchases - array of product IDs purchased by the user
  hasAccess: ({accessType = null, accessKey = null, purchases = []}) => {
    const fullAccessSet = new Set([
      C.IAP_EARLY_ADOPTER, C.IAP_FULL_ACCESS,
      C.IAP_PROFESSIONAL_5, C.IAP_PROFESSIONAL_10,
      C.IAP_PROFESSIONAL_15, C.IAP_PROFESSIONAL_20
    ])

    let hasAccess = false

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
  },

  unlockAccess: ({accessType = null, accessKey = null, onSuccess, onError}) => {

  },

  // returns the preferred product identifier available to the user for a given access type
  preferredProductForType: (accessType = null) => {
    switch (accessType) {
      case C.ACCESS_PREMIUM_COLLECTION:
        // TODO load from Firebase Remote Config
        return C.IAP_PROFESSIONAL_99
      default:
        return null
    }
  },

  fetchProductDetails: ({productId, onSuccess, onError}) => {
    return Store.loadProduct({
      productId, onSuccess, onError
    })
  }
}

Object.freeze(AccessManager)
export default AccessManager
