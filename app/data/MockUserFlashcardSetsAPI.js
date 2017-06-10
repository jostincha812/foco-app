import MockUserFlashcardSets from './mock/MockUserFlashcardSets'

export default FlashcardSetsAPI = {
  getUserFlashcardSets: (id) => {
    const keys = Object.keys(MockUserFlashcardSets)
    return keys
  },

  getUserFlashcardSet: (id, setId) => {
    return {
      userId: id,
      setId: setId,
      ...MockUserFlashcardSets[setId]
    }
  }
}
