import MockFlashcards from './MockFlashcards'
import MockFlashcardsTags from './MockFlashcardsTags'

export default FlashcardsAPI = {
  getFlashcardKeys: () => {
    const keys = Object.keys(MockFlashcards)
    return keys
  },

  getFlashcardKeysWithTags: (tags) => {

  },

  getFlashcard: (key) => {
    return MockFlashcards[key]
  },

  getFlashcardTags: (key) => {
    return Object.keys(MockFlashcardsTags[key])
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
