import refs from './JsFbRefs'
import JsFbUserPrefsAPI from './JsFbUserPrefsAPI'
import C from '../C'

export default JsUserCollectionsAPI = {
  getCollections: (ownerId, userId, filterKey) => {
    return Promise.all([
      refs.collections().orderByChild('owner').equalTo(ownerId).once('value'),
      refs.userCollectionPrefs(userId).once('value')
    ]).then(results => {
      const collections = {}
      const list = results[0].val()
      const prefs = results[1].val()

      Object.keys(list).map(key => {
        if (!filterKey || (prefs[key] && prefs[key][filterKey]) ) {
          collections[key] = list[key]
          collections[key].prefs = prefs[key]
        }
      })
      return collections
    })
  },

  getUserBookmarkedCollections: (userId, filterKey) => {
    return Promise.all([
      refs.userCollectionPrefs(userId).orderByChild(filterKey).equalTo(true).once('value'),
      refs.collections().once('value'),
    ]).then(results => {
      const collections = {}
      const list = results[0].val()
      const sources = results[1].val()

      if (list) {
        Object.keys(list).map(key => {
          collections[key] = sources[key]
          collections[key].prefs = list[key]
        })
      }
      return collections
    })
  },

  createUserCollection: (userId, data) => {
    const collections = {}
    delete data.setId
    return refs.userCollections(userId).push(data).then(ref => {
      collections[userId] = {}
      collections[userId][ref.key] = data
      return collections
    })
  },

  saveUserCollection: (userId, data) => {
    const collections = {}
    const collectionId = data.collectionId
    delete data.collectionId
    return refs.userCollections(userId).child(collectionId).update(data).then(() => {
      collections[userId] = {}
      collections[userId][collectionId] = data
      return collections
    })
  },

  deleteUserCollection: (userId, collectionId) => {
    return refs.userCollections(userId).child(collectionId).remove()
  },

  // NOTE: one time only -- use setupUserStarredFlashcardsListeners below for auto-refresh
  getUserStarredCollection: (userId) => {
    return refs.userPrefs(userId).orderByChild(C.KEY_PREF_STARRED).equalTo(true).once('value').then(snap => {
      const cards = Object.keys(snap.val())
      const collections = {}
      collections[C.KEY_PREF_STARRED] = {
        flashcards: cards ? cards : [],
        title: C.KEY_PREF_STARRED,
        tags: [],
      }
      return collections
    })
  },

  setupUserStarredCollectionListeners: (userId, callback) => {
    const r = refs.userFlashcardPrefs(userId).orderByChild(C.KEY_PREF_STARRED).equalTo(true)
    const collections = {}
    collections[C.KEY_PREF_STARRED] = {
      flashcards: [],
      title: C.KEY_PREF_STARRED,
      tags: [],
    }

    r.on('child_added', (snap) => {
      collections[C.KEY_PREF_STARRED].flashcards.push(snap.key)
      callback(collections)
    })

    r.on('child_removed', (snap) => {
      const index = sets[C.KEY_PREF_STARRED].flashcards.indexOf(snap.key)
      collections[C.KEY_PREF_STARRED].flashcards.splice(index, 1)
      callback(collections)
    })
  },

  teardownUserStarredCollectionListeners: (userId) => {
    const r = refs.userFlashcardPrefs(userId).orderByChild(C.KEY_PREF_STARRED).equalTo(true)
    r.off('child_added')
    r.off('child_removed')
  },
}
