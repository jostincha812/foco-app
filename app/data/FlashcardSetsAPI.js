import MockFlashcardSets from './MockFlashcardSets'

export default FlashcardSetsAPI = {
  getFlashcardSets: () => {
    const keys = Object.keys(MockFlashcardSets)
    return keys
  },

  getFlashcardSet: (key) => {
    return {
      id: key,
      ...MockFlashcardSets[key]
    }
  }
}
