import refs from './JsFbRefs'
import C from '../C'

export default JsUserFlashcardSetsAPI = {
  getFeaturedFlashcardSets: (userId) => {
    return refs.userFlashcardSets(userId).once('value').then(snap => {
      const sets = {}
      sets[userId] = { ...snap.val() }
      return sets
    })
  },

  getUserFlashcardSets: (userId) => {
    return refs.userFlashcardSets(userId).once('value').then(snap => {
      const sets = {}
      sets[userId] = { ...snap.val() }
      return sets
    })
  },

  createUserFlashcardSet: (userId, data) => {
    const sets = {}
    delete data.setId
    return refs.userFlashcardSets(userId).push(data).then(ref => {
      sets[userId] = {}
      sets[userId][ref.key] = data
      return sets
    })
  },

  saveUserFlashcardSet: (userId, data) => {
    const sets = {}
    const setId = data.setId
    delete data.setId
    return refs.userFlashcardSets(userId).child(setId).update(data).then(() => {
      sets[userId] = {}
      sets[userId][setId] = data
      return sets
    })
  },

  deleteUserFlashcardSet: (userId, setId) => {
    return refs.userFlashcardSets(userId).child(setId).remove()
  },

  // NOTE: one time only -- use setupUserStarredFlashcardsListeners below for auto-refresh
  getUserStarredFlashcardsSet: (userId) => {
    return refs.userPrefs(userId).orderByChild(C.KEY_PREF_STARRED).equalTo(true).once('value').then(snap => {
      const cards = Object.keys(snap.val())
      const sets = {}
      sets[C.KEY_PREF_STARRED] = {
        flashcards: cards ? cards : [],
        title: C.KEY_PREF_STARRED,
        tags: [],
      }
      return sets
    })
  },

  setupUserStarredFlashcardsListeners: (userId, callback) => {
    const r = refs.userFlashcardPrefs(userId).orderByChild(C.KEY_PREF_STARRED).equalTo(true)
    const sets = {}
    sets[C.KEY_PREF_STARRED] = {
      flashcards: [],
      title: C.KEY_PREF_STARRED,
      tags: [],
    }

    r.on('child_added', (snap) => {
      sets[C.KEY_PREF_STARRED].flashcards.push(snap.key)
      callback(sets)
    })

    r.on('child_removed', (snap) => {
      const index = sets[C.KEY_PREF_STARRED].flashcards.indexOf(snap.key)
      sets[C.KEY_PREF_STARRED].flashcards.splice(index, 1)
      callback(sets)
    })
  },

  teardownUserStarredFlashcardsListeners: (userId) => {
    const r = refs.userFlashcardPrefs(userId).orderByChild(C.KEY_PREF_STARRED).equalTo(true)
    r.off('child_added')
    r.off('child_removed')
  },
}
