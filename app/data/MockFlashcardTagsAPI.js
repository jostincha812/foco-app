import MockFlashcards from './mock/MockFlashcards'
import MockFlashcardsTags from './mock/MockFlashcardsTags'

export default FlashcardTagsAPI = {
  getFlashcardKeysWithTags: (tags) => {

  },

  getFlashcardTags: (key) => {
    return Object.keys(MockFlashcardsTags[key])
  },
}
