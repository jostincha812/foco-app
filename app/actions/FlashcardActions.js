import C from '../C'

import api from '../data/api'

export function fetchFlashcard(id, userId) {
  return {
    type: C.FETCH_FLASHCARD,
    payload: api.flashcards.getFlashcard(id, userId)
  }
}

export function fetchFlashcards(ids, userId) {
  return {
    type: C.FETCH_FLASHCARDS,
    payload: api.flashcards.getFlashcards(ids, userId)
  }
}

export function updateUserFlashcardPref(userId, flashcardId, { key, val }) {
  const pref = {}
  pref[key] = val
  return {
    type: C.UPDATE_USER_FLASHCARD_PREFS,
    payload: api.userPrefs.updateUserFlashcardPrefs(userId, flashcardId, pref)
  }
}
