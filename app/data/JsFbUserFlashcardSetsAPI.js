import refs from './JsFbRefs'

export default JsUserFlashcardSetsAPI = {
  getUserFlashcardSets: (id) => {
    return refs.userFlashcardSets(id).once('value').then(snap => {
      const sets = {}
      sets[id] = { ...snap.val() }
      return sets
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
