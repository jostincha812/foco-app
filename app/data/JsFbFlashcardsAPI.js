import C from '../C'
import refs from './JsFbRefs'
import JsFbUserPrefsAPI from './JsFbUserPrefsAPI'

export default JsFbFlashcardsAPI = {
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
    return Promise.all(promises).then(results => {
      const flashcards = {}
      results.map(f => {
        flashcards[f.id] = f
      })
      return flashcards
    })
  },

  getUserStarredFlashcards: (userId) => {
    return refs.userFlashcardPrefs(userId).orderByChild(C.KEY_PREF_STARRED).equalTo(true).once('value').then(snap => {
      if (snap.val()) {
        const promises = []
        const ids = Object.keys(snap.val())
        ids.map(id => {
          promises.push(JsFbFlashcardsAPI.getFlashcard(id, userId))
        })
        return Promise.all(promises).then(results => {
          const flashcards = {}
          results.map(f => {
            flashcards[f.id] = f
          })
          return flashcards
        })
      }
    })
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

  getFlashcardsWithTags: (level, tags1, tags2) => {
    // TODO check for levels
    // console.log(level)
    const promises1 = []

    if (tags1) {
      tags1.map(tag => {
        promises1.push(refs.flashcardsTags().orderByChild(tag).equalTo(true).once('value').then(snap => snap.val()))
      })
    }

    const promises2 = []
    if (tags2) {
      tags2.map(tag => {
        promises2.push(refs.flashcardsTags().orderByChild(tag).equalTo(true).once('value').then(snap => snap.val()))
      })
    }

    return Promise.all(promises1).then(results1 => {
      // OR -- union of results1
      let set1 = {}
      results1.map(r => set1 = Object.assign(set1, r))
      return set1
    }).then(set1 => Promise.all(promises2).then(results2 => {
      // OR -- union of results2
      let set2 = {}
      results2.map(r => set2 = Object.assign(set2, r))

      // then AND -- intersect of results1 and results2
      if (Object.keys(set1).length && Object.keys(set2).length) {
        const set3 = Object.keys(set1).filter({}.hasOwnProperty.bind(set2))
        return set3
      }

      if (Object.keys(set1).length) {
        return Object.keys(set1)
      }

      if (Object.keys(set2).length) {
        return Object.keys(set2)
      }
    }))
  }
}
