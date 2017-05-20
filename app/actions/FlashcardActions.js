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
  console.log(promises)
  return {
    type: C.FETCH_FLASHCARDS,
    payload: Promise.all(promises)
  }
}

export function updateUserFlashcardPreference({ user, flashcard, key, val }) {
  return {
    type: C.UPDATE_USER_FLASHCARD_PREFERENCE,
    payload: new Promise(resolve => {
      setTimeout(
        () => resolve(`[${user.id} :: ${flashcard.id}] ${key}=${val}`)
        , 1000)
    })
  }
}
