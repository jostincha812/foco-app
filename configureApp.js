import firebase from './configureFirebase'
import C from './app/constants'

const settings = {
  hasExperimentalFeature: false,
  fullUpgradeProductId: C.IAP_PROFESSIONAL_5,
}

const ConfigKeys = {
  fullUpgradeProductId: 'full_upgrade_product_id',
}

// default of 12 hours
let CACHE_DURATION = 43200

// TODO remove from production with flag
// if (__DEV__) {
  firebase.config().enableDeveloperMode();
  CACHE_DURATION = 0
// }

// Set default values
// SKIPPED - using defaults above
// firebase.config().setDefaults({
//   hasExperimentalFeature: settings.hasExperimentalFeature,
//   fullUpgradeProductId: settings.fullUpgradeProductId
// });

// Fetch remote config and set accordingly
firebase.config().fetch(CACHE_DURATION)
  .then(() => firebase.config().activateFetched())
  .then(() => firebase.config().getValue(ConfigKeys.fullUpgradeProductId))
  .then((snapshot) => {
   settings.fullUpgradeProductId = snapshot.val();
   settings.hasExperimentalFeature = false;
   // console.log(`RemoteConfig activated with fullUpgradeProductId=${settings.fullUpgradeProductId}`)
   // continue booting app
  })
  .catch((error) => console.log(`Error processing config: ${error}`));

export default RemoteConfig = settings;
