const MockUserFlashcardPerfs = {}

export default UserFlashcardPrefsAPI = {
  getUserFlashcardPrefs: (userId, flashcardId) => {
    return new Promise((resolve, reject) => {
      if (!userId) {
        reject(`Error: Cannot get user prefs for ${userId}`)
      }

      if (!MockUserFlashcardPerfs[userId]) {
        MockUserFlashcardPerfs[userId] = {}
      }
      resolve(MockUserFlashcardPerfs[userId][flashcardId])
    })
  },

  updateUserFlashcardPrefs: (userId, flashcardId, prefs) => {
    if (!MockUserFlashcardPerfs[userId]) {
      MockUserFlashcardPerfs[userId] = {}
    }

    const f = Object.assign({}, MockUserFlashcardPerfs[userId][flashcardId], prefs)
    MockUserFlashcardPerfs[userId][flashcardId] = f
    return f
  },
}
