import refs from './JsFbRefs'

export default JsFbUserFlashcardPrefsAPI = {
  getUserFlashcardPrefs: (userId, flashcardId) => {
    return refs.userFlashcardPref(userId, flashcardId).once('value').then(snap => {
      return snap.val()
    })
  },

  upsertUserFlashcardPrefs: (userId, flashcardId, prefs) => {
    return refs.userFlashcardPref(userId, flashcardId).update(prefs)
  },

  getUserCollectionPrefs: (userId, collectionId) => {
    return refs.userCollectionPref(userId, collectionId).once('value').then(snap => {
      return snap.val()
    })
  },

  upsertUserCollectionPrefs: (userId, collectionId, prefs) => {
    return refs.userCollectionPref(userId, collectionId).update(prefs)
  },
}
