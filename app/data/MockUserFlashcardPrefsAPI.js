const MockUserFlashcardPerfs = {}

export default UserFlashcardPrefsAPI = {
  getUserFlashcardPrefs: (userId) => {
    if (!MockUserFlashcardPerfs[userId]) {
      MockUserFlashcardPerfs[userId] = {}
    }
    return MockUserFlashcardPerfs[userId]
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
