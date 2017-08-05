import RNFirebase from 'react-native-firebase'

const configurationOptions = {
  debug: true
}

// export default function configureFirebase() {
//   return RNFirebase.initializeApp(configurationOptions)
// }

const firebase = RNFirebase.initializeApp(configurationOptions)
export default firebase
export const fbAnalytics = firebase.analytics()
