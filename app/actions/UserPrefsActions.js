import C from '../C'
import api from '../data/api'

export function updateUserFlashcardPref(userId, flashcardId, { key, val }) {
  const pref = {}
  pref[key] = val
  return {
    type: C.UPDATE_USER_FLASHCARD_PREFS,
    payload: api.userPrefs.updateUserFlashcardPrefs(userId, flashcardId, pref),
  }
}
