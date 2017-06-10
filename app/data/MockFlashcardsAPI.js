import MockFlashcards from './mock/MockFlashcards'
import MockFlashcardsTags from './mock/MockFlashcardsTags'

import MockUserPrefsAPI from './MockUserPrefsAPI'

export default MockFlashcardsAPI = {
  getFlashcardIds: () => {
    return new Promise(resolve => resolve(Object.keys(MockFlashcards)))
  },

  getFlashcardIdsWithTags: (tags) => {

  },

  getFlashcard: (id, userId) => {
    return Promise.all([
      new Promise(resolve => resolve({id, ...MockFlashcards[id]})),
      MockFlashcardsAPI.getFlashcardTags(id),
      MockUserPrefsAPI.getUserFlashcardPrefs(userId, id),
    ]).then(results => {
      return {...results[0], tags:results[1], prefs:results[2]}
    })
  },

  getFlashcards: (ids, userId) => {
    const promises = []
    ids.map(id => {
      promises.push(MockFlashcardsAPI.getFlashcard(id, userId))
    })
    return Promise.all(promises)
  },

  updateFlashcard: (key, data) => {
    return new Promise(resolve => {
      const f = Object.assign({}, MockFlashcards[key], data)
      MockFlashcards[key] = f
      resolve(f)
    })
  },

  deleteFlashcard: (key) => {
    return new Promise(resolve => {
      const status = {}
      status[C.KEY_STATUS] = C.STATUS_DELETED
      const f = Object.assign({}, MockFlashcards[key], status)
      MockFlashcards[key] = f
      resolve(f)
    })
  },

  getFlashcardTags: (key) => {
    return new Promise(resolve => {
      resolve(Object.keys(MockFlashcardsTags[key]))
    })
  },
}
