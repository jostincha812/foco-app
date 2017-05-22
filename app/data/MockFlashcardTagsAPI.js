import MockFlashcards from './MockFlashcards'

export default FlashcardTagsAPI = {
  getFlashcardKeysWithTags: (tags) => {

  },

  getFlashcardTags: (key) => {
    return Object.keys(MockFlashcardsTags[key])
  },
}
