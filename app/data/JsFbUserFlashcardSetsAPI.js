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
    return refs.userPrefs(id).orderByChild(C.KEY_PREF_STARRED).equalTo(true).once('value').then(snap => {
      const cards = Object.keys(snap.val())
      const set = {
        flashcards: cards ? cards : [],
        title: C.KEY_PREF_STARRED.toUpperCase(),
        tags: [],
      }
      console.log(set)
      return set
    }).then(result => {
      return refs.userFlashcardSets(id).once('value').then(snap => {
        const sets = {}
        sets[id] = { ...snap.val() }
        sets[id][C.KEY_PREF_STARRED] = result
        return sets
      })
    })
  },
  //
  //
  // getUserFlashcardSets: (id) => {
  //   return new Promise(resolve => {
  //     const sets = {}
  //     sets[id] = { ...MockUserFlashcardSets[id] }
  //     resolve(sets)
  //   })
  // },
}
