import MockFlashcards from './mock/MockFlashcards'
import MockFlashcardTagsAPI from './MockFlashcardTagsAPI'
import MockUserFlashcardPrefsAPI from './MockUserFlashcardPrefsAPI'

export default FlashcardsAPI = {
  getFlashcardKeys: () => {
    const keys = Object.keys(MockFlashcards)
    return keys
  },

  getFlashcard: (key) => {
    const userId = "12345"

    return new Promise(resolve =>
      resolve({id: key, ...MockFlashcards[key]})
    ).then(result => {
      // TODO convert Tags API to return promises
      return new Promise(resolve => {
        const tags = MockFlashcardTagsAPI.getFlashcardTags(key)
        resolve({...result, tags})
      })
    }).then(result => {
      // TODO convert UserFlashcardPrefs API to return promises
      return new Promise(resolve => {
        const prefs = MockUserFlashcardPrefsAPI.getUserFlashcardPrefs(userId, key)
        resolve({...result, prefs})
      })
    })
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
