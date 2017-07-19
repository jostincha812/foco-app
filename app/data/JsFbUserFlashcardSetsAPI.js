import refs from './JsFbRefs'
import C from '../C'

export default JsUserFlashcardSetsAPI = {
  getFeaturedFlashcardSets: (id) => {
    return refs.userFlashcardSets(id).once('value').then(snap => {
      const sets = {}
      sets[id] = { ...snap.val() }
      return sets
    })
  },

  getUserFlashcardSets: (id) => {
    return refs.userFlashcardSets(id).once('value').then(snap => {
      const sets = {}
      sets[id] = { ...snap.val() }
      return sets
    })
  },

  // getUserStarredFlashcardsSet: (id) => {
  //   return refs.userPrefs(id).orderByChild(C.KEY_PREF_STARRED).equalTo(true).once('value').then(snap => {
  //     const cards = Object.keys(snap.val())
  //     const sets = {}
  //     sets[C.KEY_PREF_STARRED] = {
  //       flashcards: cards ? cards : [],
  //       title: C.KEY_PREF_STARRED,
  //       tags: [],
  //     }
  //     return sets
  //   })
  // },

  setupUserStarredFlashcardsListeners: (id, callback) => {
    const r = refs.userPrefs(id).orderByChild(C.KEY_PREF_STARRED).equalTo(true)
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

  teardownUserStarredFlashcardsListeners: (id) => {
    const r = refs.userPrefs(id).orderByChild(C.KEY_PREF_STARRED).equalTo(true)
    r.off('child_added')
    r.off('child_removed')
  },
}
