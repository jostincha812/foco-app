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

  estimateFlashcardSetFromTags: (level, tags1, tags2) => {
    // TODO check for levels
    // console.log(level)
    const promises1 = []

    if (tags1) {
      tags1.map(tag => {
        promises1.push(refs.flashcardsTags().orderByChild(tag).equalTo(true).once('value').then(snap => snap.val()))
      })
    }

    const promises2 = []
    if (tags2) {
      tags2.map(tag => {
        promises2.push(refs.flashcardsTags().orderByChild(tag).equalTo(true).once('value').then(snap => snap.val()))
      })
    }

    return Promise.all(promises1).then(results1 => {
      // OR -- union of results
      let set1 = {}
      results1.map(r => set1 = Object.assign(set1, r))
      return set1
    }).then(set1 => Promise.all(promises2).then(results2 => {
      // OR -- union of results
      let set2 = {}
      results2.map(r => set2 = Object.assign(set2, r))

      // then AND -- intersect of results
      if (Object.keys(set1).length && Object.keys(set2).length) {
        const set3 = Object.keys(set1).filter({}.hasOwnProperty.bind(set2))
        console.log(set3)
        return set3
      }

      if (Object.keys(set1).length) {
        console.log(Object.keys(set1))
        return Object.keys(set1)
      }

      if (Object.keys(set2).length) {
        console.log(Object.keys(set2))
        return Object.keys(set2)
      }
    }))
  }
}
