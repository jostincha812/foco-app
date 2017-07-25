import C from '../C'
import api from '../data/api'

export function fetchFeaturedFlashcardSets(userId) {
  return {
    type: C.FETCH_USER_FLASHCARD_SETS,
    userId: userId,
    payload: api.flashcardSets.getFeaturedFlashcardSets(userId)
  }
}

export function fetchUserFlashcardSets(userId) {
  return {
    type: C.FETCH_USER_FLASHCARD_SETS,
    userId: userId,
    payload: api.flashcardSets.getUserFlashcardSets(userId)
  }
}

export function createUserFlashcardSet(userId, data) {
  return {
    type: C.CREATE_USER_FLASHCARD_SET,
    userId: userId,
    payload: api.flashcardSets.createUserFlashcardSet(userId, data)
  }
}

export function saveUserFlashcardSet(userId, data) {
  return {
    type: C.SAVE_USER_FLASHCARD_SET,
    userId: userId,
    payload: api.flashcardSets.saveUserFlashcardSet(userId, data)
  }
}

// NOTE: one time only -- use setupUserStarredFlashcardsListeners below for auto-refresh
export function fetchUserStarredFlashcardsSet(userId) {
  return {
    type: C.FETCH_USER_FLASHCARD_SETS,
    userId: userId,
    payload: api.flashcardSets.getUserStarredFlashcardsSet(userId)
  }
}

export function setupUserStarredFlashcardsListeners(userId) {
  return dispatch => {
    dispatch({
      type: C.STARRED_USER_FLASHCARDS_ON,
      userId: userId,
    })

    api.flashcardSets.setupUserStarredFlashcardsListeners(userId, (results) => {
      dispatch({
        type: C.STARRED_USER_FLASHCARDS_UPDATED,
        userId: userId,
        payload: results,
      })
    })
  }
}

export function teardownUserStarredFlashcardsListeners(userId) {
  return dispatch => {
    dispatch({
      type: C.STARRED_USER_FLASHCARDS_OFF,
      userId: userId,
    })
    api.flashcardSets.teardownUserStarredFlashcardsListeners(userId)
  }
}
