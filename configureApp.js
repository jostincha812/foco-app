import firebase from './configureFirebase'
import C from './app/constants'

const settings = {
  inReview: false,
  reviewerMode: false,
  reviewerVersion: C.VERSION,
  IAPFlowConfig: C.CONFIG_IAP_PREMIUM_COLLECTIONS_FLOW_THROUGH,
  // fullUpgradeProductId: C.IAP_PROFESSIONAL_3,
  // refUpgradeProductId: C.IAP_PROFESSIONAL_2,
  // promoEnabled: false,
  // promoEndDate: 'Aug 31, 2018',
  // promoHeadline: 'WSET-3 Unlock',
  wset3UpgradeHeadline: '',
  wset3UpgradeDescription: '',
  wset3UpgradeProductId: C.IAP_PROFESSIONAL_5,
}

const ConfigKeys = {
  reviewerMode: 'reviewer_mode',
  reviewerVersion: 'reviewer_version',
  IAPFlowConfig: 'iap_flow_config',
  // fullUpgradeProductId: 'full_upgrade_product_id',
  // refUpgradeProductId: 'ref_upgrade_product_id',
  // promoEnabled: 'promo_enabled',
  // promoEndDate: 'promo_end_date',
  // promoHeadline: 'promo_headline',
  wset3UpgradeHeadline: 'wset3_upgrade_headline',
  wset3UpgradeDescription: 'wset3_upgrade_description',
  wset3UpgradeProductId: 'wset3_upgrade_product_id',
}

// default of 12 hours
let CACHE_DURATION = 43200
if (__DEV__) {
  firebase.config().enableDeveloperMode()
  CACHE_DURATION = 0
}

// Set default values
const defaults = {}
defaults[ConfigKeys.reviewerMode] = settings.reviewerMode
defaults[ConfigKeys.reviewerVersion] = settings.reviewerVersion
defaults[ConfigKeys.IAPFlowConfig] = settings.IAPFlowConfig
// defaults[ConfigKeys.fullUpgradeProductId] = settings.fullUpgradeProductId
// defaults[ConfigKeys.refUpgradeProductId] = settings.refUpgradeProductId
// defaults[ConfigKeys.promoEnabled] = settings.promoEnabled
// defaults[ConfigKeys.promoEndDate] = settings.promoEndDate
// defaults[ConfigKeys.promoHeadline] = settings.promoHeadline
defaults[ConfigKeys.wset3UpgradeProductId] = settings.wset3UpgradeProductId
defaults[ConfigKeys.wset3UpgradeHeadline] = settings.wset3UpgradeHeadline
defaults[ConfigKeys.wset3UpgradeDescription] = settings.wset3UpgradeDescription
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
