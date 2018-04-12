import RNFirebase from 'react-native-firebase'

const app = RNFirebase.app()
export default app
export const firebase = RNFirebase
export const fbAuth = firebase.auth()
export const fbAnalytics = firebase.analytics()
