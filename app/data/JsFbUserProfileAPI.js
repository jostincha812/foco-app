import refs from './JsFbRefs'
import { UserDefaults } from './defaults'

export default JsFbUserProfileAPI = {
  getUserProfile: (uid) => {
    return refs.user(uid).once('value').then(snap => {
      return {uid, ...snap.val()}
    })
  },

  upsertUserProfile: (uid, profile) => {
    return refs.user(uid).once('value').then(snap => {
      let p = profile
      if (!snap.val()) {
        // new user, insert with default user params
        p = Object.assign({}, p, {...UserDefaults})
      }
      return refs.user(uid).update(p).then(() => {
        return {uid, ...p}
      })
    })
  },

  upsertUserPurchases: (uid, purchases) => {
    return refs.user(uid).once('value').then(snap => {
      return refs.user(uid).child('purchases').set(purchases).then(() => {
        return purchases
      })
    })
  },

  upsertUserTransaction: (uid, transaction) => {
    return refs.user(uid).once('value').then(snap => {
      return refs.user(uid).child('transactions').push(transaction).then(() => {
        return transaction
      })
    })
  }
}
