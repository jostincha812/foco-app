import MockUserFlashcardSets from './mock/MockUserFlashcardSets'

export default FlashcardSetsAPI = {
  getUserFlashcardSets: (id) => {
    return new Promise(resolve => {
      const sets = {}
      sets[id] = { ...MockUserFlashcardSets[id] }
      resolve(sets)
    })
  },
}
