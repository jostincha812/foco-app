import C from '../C'

import api from '../data/api'

export function fetchFlashcard(key) {
  return {
    type: C.FETCH_FLASHCARD,
    payload: new Promise(resolve => {
      resolve(api.flashcards.getFlashcard(key))
    })
  }
}

export function fetchFlashcards(keys) {
  const promises = []
  keys.map(key => {
    promises.push(new Promise(resolve => resolve(api.flashcards.getFlashcard(key))))
  })
  return {
    type: C.FETCH_FLASHCARDS,
    payload: Promise.all(promises)
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
