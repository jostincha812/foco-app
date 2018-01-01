import C from '../C'
import api from '../data/api'

export function updateUserFlashcardPref(userId, flashcardId, pref) {
  return {
    type: C.UPDATE_USER_FLASHCARD_PREFS,
    payload: api.userPrefs.updateUserFlashcardPrefs(userId, flashcardId, pref),
  }
}

export function updateUserCollectionPref(userId, collectionId, pref) {
  return {
    type: C.UPDATE_USER_COLLECTION_PREFS,
    payload: api.userPrefs.updateUserCollectionPrefs(userId, collectionId, pref)
  }
}
