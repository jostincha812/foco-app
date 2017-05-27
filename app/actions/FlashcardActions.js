import C from '../C'

import api from '../data/api'

export function fetchFlashcard(key) {
  return {
    type: C.FETCH_FLASHCARD,
    payload: new Promise(resolve => {
      resolve(api.flashcards.getFlashcard(key))
    })
  }
  // return dispatch => {
  //   return dispatch({
  //     type: C.FETCH_FLASHCARD,
  //     payload: new Promise(resolve => {
  //       resolve(api.flashcards.getFlashcard(key))
  //     })
  //   }).then(({value, action}) => {
  //     console.log(value)
  //     console.log(action)
  //     return new Promise(resolve => {
  //       resolve(value)
  //     })
  //   })
  // }
}

export function fetchFlashcards(userId, keys) {
  const promises = []
  keys.map(key => {
    promises.push(api.flashcards.getFlashcard(key))
    // promises.push(new Promise(resolve => resolve(api.flashcards.getFlashcard(key))).then(
    //   new Promise(resolve => resolve(api.userFlashcardPrefs.getUserFlashcardPrefs(userId, key)))
    // ))
    // promises.push(fetchFlashcard(key))
  })
  return {
    type: C.FETCH_FLASHCARDS,
    payload: Promise.all(promises)
  }
}

export function fetchUserFlashcardPrefs(user) {
  return {
    type: C.FETCH_USER_FLASHCARD_PREFS,
    payload: new Promise(resolve => {
      resolve(api.userFlashcardPrefs.getUserFlashcardPrefs(user.id))
    })
  }
}

export function updateUserFlashcardPref({ user, flashcard, key, val }) {
  const pref = {}
  pref[key] = val
  return {
    type: C.UPDATE_USER_FLASHCARD_PREFS,
    payload: new Promise(resolve => {
      resolve(api.userFlashcardPrefs.updateUserFlashcardPrefs(user.id, flashcard.id, pref))
    })
  }
}
