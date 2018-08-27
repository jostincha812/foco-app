import refs from './JsFbRefs'
import { UserDefaults } from './defaults'

export default JsFbUserProfileAPI = {
  getUserProfile: (uid) => {
    return refs.user(uid).once('value').then(snap => {
      return {uid, ...snap.val()}
    })
  },

  deleteUserProfile: (uid) => {
    const promises = []
    promises.push(refs.user(uid).remove())
    promises.push(refs.userFlashcardPrefs(uid).remove())
    promises.push(refs.userCollectionPrefs(uid).remove())
    return Promise.all(promises)
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

  insertUserTransaction: (uid, transaction) => {
    return refs.user(uid).once('value').then(snap => {
      return refs.user(uid).child('transactions').push(transaction).then(() => {
        return transaction
      })
    })
  },

  fetchUserCounters: (uid) => {
    return refs.userCounters(uid).once('value').then(snap => {
      return snap.val()
    })
  },

  incrementUserSessionsCounter: (uid) => {
    return refs.userCounters(uid).child('sessions').transaction((count) => {
      return (count || 0) + 1
    })
    .then(({snapshot}) => {
      return {sessions: snapshot.val()}
    })
  },

  incrementUserActionsCounter: (uid) => {
    return refs.userCounters(uid).child('actions').transaction((count) => {
      return (count || 0) + 1
    })
    .then(({snapshot}) => {
      return {actions: snapshot.val()}
    })
  },

  upsertUserPromptCounters: (uid, counters) => {
    return refs.userCounters(uid).transaction((data) => {
      return Object.assign({}, data, {...counters})
    })
    .then(({snapshot}) => {
      return snapshot.val()
    })
  },
}
