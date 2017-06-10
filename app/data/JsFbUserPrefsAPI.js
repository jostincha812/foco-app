import refs from './JsFbRefs'

export default JsFbUserFlashcardPrefsAPI = {
  getUserFlashcardPrefs: (userId, flashcardId) => {
    return refs.userPrefs(userId,flashcardId).once('value').then(snap => {
      return snap.val()
    })
  },

  updateUserFlashcardPrefs: (userId, flashcardId, prefs) => {
    return refs.userPrefs(userId, flashcardId).update(prefs)
  },
}
