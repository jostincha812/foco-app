import firebase from './configureFirebase'
import C from './app/constants'

const settings = {
  hasExperimentalFeature: false,
  fullUpgradeProductId: C.IAP_PROFESSIONAL_10,
}

// TODO remove from production with flag
// if (__DEV__) {
  firebase.config().enableDeveloperMode();
// }

// Set default values
firebase.config().setDefaults({
  hasExperimentalFeature: settings.hasExperimentalFeature,
  fullUpgradeProductId: settings.fullUpgradeProductId
});

// Fetch remote config and set accordingly
firebase.config().fetch()
 .then(() => firebase.config().activateFetched())
 .then(() => firebase.config().getValue('fullUpgradeProductId'))
 .then((snapshot) => {
   settings.fullUpgradeProductId = snapshot.val();
   settings.hasExperimentalFeature = false;
   // continue booting app
 })
 .catch((error) => console.log(`Error processing config: ${error}`));

export default RemoteConfig = settings;
