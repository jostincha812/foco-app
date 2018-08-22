import C from '../constants'
import RemoteConfig from '../../configureApp'
import CurrentUser from '../auth/CurrentUser'
import Store from './Store'

const wset3products = [
  C.IAP_EARLY_ADOPTER,
  C.IAP_PROFESSIONAL_2,
  C.IAP_PROFESSIONAL_3,
  C.IAP_PROFESSIONAL_5
]

const wset2products = [
  C.IAP_PROFESSIONAL_2,
  C.IAP_PROFESSIONAL_5
]

const hasLockAccess = ({config, accessRequired, contentType = null, contentKey = null}) => {
  if (RemoteConfig.inReview) {
    // TODO update product sets to whatever reviewers should see
  }

  let hasAccess = false
  switch (accessRequired) {
    case C.ACCESS_FULL:
    case C.ACCESS_PREMIUM_COLLECTION:
    case C.ACCESS_PREMIUM_FLASHCARD:
      hasAccess = CurrentUser.hasPurchasedProducts(wset3products)
      break

    case C.ACCESS_PREMIUM_COLLECTION_WSET2:
      hasAccess = CurrentUser.hasPurchasedProducts(wset2products)
      break

    default:
      hasAccess = true
  }

  return hasAccess
}

const hasFlowThroughAccess = ({config, accessRequired, contentType = null, contentKey = null}) => {
  if (RemoteConfig.inReview) {
    // TODO update product sets to whatever reviewers should see
  }

  let hasAccess = false
  switch (accessRequired) {
    case C.ACCESS_PREMIUM_COLLECTION:
      if (contentType === C.CONTENT_COLLECTION) {
        hasAccess = false
      }
      if (contentType === C.CONTENT_FLASHCARD) {
        hasAccess = CurrentUser.hasPurchasedProducts(wset3products)
      }
      break
    case C.ACCESS_PREMIUM_COLLECTION_WSET2:
      if (contentType === C.CONTENT_COLLECTION) {
        hasAccess = CurrentUser.hasPurchasedProducts(wset2products)
      }
      break

    default:
      hasAccess = true
  }

  return hasAccess
}

// Params:
const hasAccess = (options) => {
  const {config, accessRequired, contentType = null, contentKey = null} = options
  switch (config) {
    case C.CONFIG_IAP_PREMIUM_COLLECTIONS_FLOW_THROUGH:
      return (hasFlowThroughAccess(options))
    case C.CONFIG_IAP_PREMIUM_COLLECTIONS_LOCK:
    default:
      return (hasLockAccess(options))
  }
}

const unlockAccess = ({productId, accessType = null, accessKey = null, onSuccess, onCancel, onError}) => {
  // TODO remove from production with flag
  // if (__DEV__) {
  // --- SIMULATOR ONLY ---
  // setTimeout(() => CurrentUser.addPurchase({
  //   productId,
  //   transaction: {},
  //   onComplete: () => onSuccess('*** Simulated purchase successfully completed ***')
  // }), 1200)

  // --- SIMULATOR ONLY ---
  // } else {
  const purchases = new Set(CurrentUser.purchases)
  if (purchases.has(productId)) {
    onSuccess()
  }

  Store.purchaseProduct({
    productId,
    onSuccess: (transaction, message) => {
      CurrentUser.addPurchase({
        productId,
        transaction,
        onComplete: () => onSuccess(message)
      })
    },
    onCancel,
    onError
  })
  // }
}

// returns the preferred product identifier available to the user for a given access type
const preferredProductForType = (accessType = null) => {
  switch (accessType) {
    case C.ACCESS_PREMIUM_COLLECTION:
      // load from Firebase Remote Config
      return RemoteConfig.fullUpgradeProductId
    default:
      return C.IAP_PROFESSIONAL_3
  }
}

const referenceProductForType = (accessType = null) => {
  switch (accessType) {
    case C.ACCESS_PREMIUM_COLLECTION:
      // load from Firebase Remote Config
      return RemoteConfig.refUpgradeProductId
    default:
      return C.IAP_PROFESSIONAL_3
  }
}

const fetchProductDetails = ({productId, onSuccess, onError}) => {
  return Store.loadProduct({
    productId, onSuccess, onError
  })
}

const fetchProducts = ({products, onSuccess, onError}) => {
  return Store.loadProducts({
    products, onSuccess, onError
  })
}

const AccessManager = {
  hasAccess,
  unlockAccess,
  preferredProductForType,
  referenceProductForType,
  fetchProducts,
  fetchProductDetails
}

Object.freeze(AccessManager)
export default AccessManager
