import MockFlashcards from './mock/MockFlashcards'
import MockFlashcardTagsAPI from './MockFlashcardTagsAPI'

export default FlashcardsAPI = {
  getFlashcardKeys: () => {
    const keys = Object.keys(MockFlashcards)
    return keys
  },

  getFlashcard: (key) => {
    const tags = MockFlashcardTagsAPI.getFlashcardTags(key)
    return {id:key, ...MockFlashcards[key], tags}
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
