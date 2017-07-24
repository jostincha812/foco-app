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

  createUserFlashcardSet: (id, level, title, flashcards, tags) => {
    const sets = {}
    const data = {
      level,
      title,
      flashcards: Object.values(flashcards),
      tags
    }
    return refs.userFlashcardSets(id).push(data).then(ref => {
      sets[id] = {}
      sets[id][ref.key] = data
      return sets
    })
  },

  saveUserFlashcardSet: (id, setId, level, title, flashcards, tags) => {
    const sets = {}
    const data = {
      level,
      title,
      flashcards: Object.values(flashcards),
      tags
    }
    return refs.userFlashcardSets(id).child(setId).update(data).then(ref => {
      sets[id] = {}
      sets[id][setId] = data
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
    const r = refs.userFlashcardPrefs(id).orderByChild(C.KEY_PREF_STARRED).equalTo(true)
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
    const r = refs.userFlashcardPrefs(id).orderByChild(C.KEY_PREF_STARRED).equalTo(true)
    r.off('child_added')
    r.off('child_removed')
  },
}
