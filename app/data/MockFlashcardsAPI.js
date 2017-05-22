import MockFlashcards from './mock/MockFlashcards'

export default FlashcardsAPI = {
  getFlashcardKeys: () => {
    const keys = Object.keys(MockFlashcards)
    return keys
  },

  getFlashcard: (key) => {
    return {id:key, ...MockFlashcards[key]}
  },

  updateFlashcard: (key, data) => {
    const f = Object.assign({}, MockFlashcards[key], data)
    MockFlashcards[key] = f
    return f
  },

  deleteFlashcard: (key) => {
    const status = {}
    status[C.KEY_STATUS] = C.STATUS_DELETED
    const f = Object.assign({}, MockFlashcards[key], status)
    MockFlashcards[key] = f
    return f
  },
}
