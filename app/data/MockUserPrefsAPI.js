const MockUserPrefs = {}

export default UserFlashcardPrefsAPI = {
  getUserFlashcardPrefs: (userId, flashcardId) => {
    return new Promise((resolve, reject) => {
      if (!userId) {
        reject(`Error: Cannot get user prefs for ${userId}`)
      }

      if (!MockUserPrefs[userId]) {
        MockUserPrefs[userId] = {}
      }
      resolve(MockUserPrefs[userId][flashcardId])
    })
  },

  updateUserFlashcardPrefs: (userId, flashcardId, prefs) => {
    return new Promise(resolve => {
      if (!MockUserPrefs[userId]) {
        MockUserPrefs[userId] = {}
      }

      const f = Object.assign({}, MockUserPrefs[userId][flashcardId], prefs)
      MockUserPrefs[userId][flashcardId] = f
      resolve(f)
    })
  },
}
