import MockFlashcardSets from './mock/MockFlashcardSets'

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
