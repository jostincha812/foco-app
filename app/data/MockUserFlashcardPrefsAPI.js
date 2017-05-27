const MockUserFlashcardPerfs = {}

export default UserFlashcardPrefsAPI = {
  getUserFlashcardPrefs: (userId, flashcardId) => {
    if (!MockUserFlashcardPerfs[userId]) {
      MockUserFlashcardPerfs[userId] = {}
    }
    console.log(MockUserFlashcardPerfs[userId])
    return MockUserFlashcardPerfs[userId][flashcardId]
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
