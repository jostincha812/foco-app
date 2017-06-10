import * as firebase from 'firebase'

import refs from './JsFbRefs'
import JsFbUserPrefsAPI from './JsFbUserPrefsAPI'

export default JsFbFlashcardsAPI = {
  getFlashcardIds: () => {
    return refs.flashcards().once('value').then(snap => {
      return (Object.keys(snap.val()))
    })
  },

  getFlashcardIdsWithTags: (tags) => {

  },

  getFlashcard: (id, userId) => {
    return Promise.all([
      refs.flashcard(id).once('value').then(snap => {
        return {id, ...snap.val()}
      }),
      JsFbFlashcardsAPI.getFlashcardTags(id),
      JsFbUserPrefsAPI.getUserFlashcardPrefs(userId, id),
    ]).then(results => {
      return {...results[0], tags:results[1], prefs:results[2]}
    })
  },

  getFlashcards: (ids, userId) => {
    const promises = []
    ids.map(id => {
      promises.push(JsFbFlashcardsAPI.getFlashcard(id, userId))
    })
    return Promise.all(promises)
  },

  updateFlashcard: (id, data) => {
    return refs.flashcard(id).update(data)
  },

  deleteFlashcard: (id) => {
    const status = {}
    status[C.KEY_STATUS] = C.STATUS_DELETED
    return JsFbFlashcardsAPI.deleteFlashcard(id, {status})
  },

  getFlashcardTags: (id) => {
    return refs.flashcardTags(id).once('value').then(snap => {
      return Object.keys(snap.val())
    })
  },
}
