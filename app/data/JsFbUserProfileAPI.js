import * as firebase from 'firebase'

import refs from './JsFbRefs'
import { UserDefaults } from './defaults'

export default JsFbUserProfileAPI = {
  upsertUserProfile: (uid, profile) => {
    return refs.user(uid).once('value').then(snap => {
      let p = profile
      if (!snap.val()) {
        // new user, insert with default user params
        p = Object.assign({}, p, {...UserDefaults})
        console.log('defaults inserted')
      }
      console.log(p)
      return refs.user(uid).update(p).then(() => {
        return {uid, ...p}
      })
    })
  },

  getUserProfile: (uid) => {
    return refs.user(uid).once('value').then(snap => {
      return {uid, ...snap.val()}
    })
  },
}
