import firebase from './configureFirebase'
import C from './app/constants'

const settings = {
  inReview: false,
  reviewerMode: false,
  reviewerVersion: C.VERSION,
  fullUpgradeProductId: C.IAP_PROFESSIONAL_3,
  refUpgradeProductId: C.IAP_PROFESSIONAL_5,
  IAPFlowConfig: C.CONFIG_IAP_PREMIUM_COLLECTIONS_FLOW_THROUGH,
  promoEnabled: false,
  promoEndDate: 'Aug 31, 2018',
  promoHeadline: 'WSET-3 Unlock'
}

const ConfigKeys = {
  reviewerMode: 'reviewer_mode',
  reviewerVersion: 'reviewer_version',
  fullUpgradeProductId: 'full_upgrade_product_id',
  refUpgradeProductId: 'ref_upgrade_product_id',
  IAPFlowConfig: 'iap_flow_config',
  promoEnabled: 'promo_enabled',
  promoEndDate: 'promo_end_date',
  promoHeadline: 'promo_headline',
}

// default of 12 hours
let CACHE_DURATION = 43200
if (__DEV__) {
  firebase.config().enableDeveloperMode()
  CACHE_DURATION = 0
}

// Set default values
const defaults = {}
defaults[ConfigKeys.fullUpgradeProductId] = settings.fullUpgradeProductId
defaults[ConfigKeys.refUpgradeProductId] = settings.refUpgradeProductId
defaults[ConfigKeys.reviewerMode] = settings.reviewerMode
defaults[ConfigKeys.reviewerVersion] = settings.reviewerVersion
defaults[ConfigKeys.IAPFlowConfig] = settings.IAPFlowConfig
defaults[ConfigKeys.promoEnabled] = settings.promoEnabled
defaults[ConfigKeys.promoEndDate] = settings.promoEndDate
defaults[ConfigKeys.promoHeadline] = settings.promoHeadline
firebase.config().setDefaults(defaults)

// Fetch remote config and set accordingly
firebase.config().fetch(CACHE_DURATION)
  .then(() => firebase.config().activateFetched())
  .then(() => firebase.config().getValues(Object.values(ConfigKeys)))
  .then((objects) => {
    Object.keys(ConfigKeys).forEach((key) => {
      settings[key] = objects[ConfigKeys[key]].val()
    })

    settings.inReview = settings.reviewerMode && (settings.reviewerVersion == C.VERSION)
  })
  // TODO log error on Crashlytics
  .catch((error) => console.log(`Error processing config: ${error}`))

export default RemoteConfig = settings
