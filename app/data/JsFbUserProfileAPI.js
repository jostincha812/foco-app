import * as firebase from 'firebase'

import refs from './JsFbRefs'

export default JsFbUserProfileAPI = {
  getUserProfile: (uid) => {
    return refs.user(uid).once('value').then(snap => {
      return {uid, ...snap.val()}
    })
  },
}
