import A from './actionTypes'
import api from '../data/api'

export function upsertUserFlashcardPrefs(userId, flashcardId, prefs) {
  return {
    type: A.UPDATE_USER_FLASHCARD_PREFS,
    payload: api.userPrefs.upsertUserFlashcardPrefs(userId, flashcardId, prefs),
    meta: {
      userId,
      flashcardId,
      prefs
    }
  }
}

export function upsertUserCollectionPrefs(userId, collectionId, prefs) {
  return {
    type: A.UPDATE_USER_COLLECTION_PREFS,
    payload: api.userPrefs.upsertUserCollectionPrefs(userId, collectionId, prefs),
    meta: {
      userId,
      collectionId,
      prefs
    }
  }
}
