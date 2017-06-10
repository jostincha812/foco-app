import refs from './JsFbRefs'

export default JsUserFlashcardSetsAPI = {
  getUserFlashcardSets: (id) => {
    return refs.userFlashcardSets(id).once('value').then(snap => {
      return Object.keys(snap.val())
    })
  },

  getUserFlashcardSet: (id, setId) => {
    return refs.userFlashcardSet(id, setId).once('value').then(snap => {
      return {userId: id, setId: setId, ...snap.val()}
    })
  }
}
