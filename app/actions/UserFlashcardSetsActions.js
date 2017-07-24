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

export function createUserFlashcardSet(userId, level, title, flashcards, tags) {
  return {
    type: C.CREATE_USER_FLASHCARD_SET,
    userId: userId,
    payload: api.flashcardSets.createUserFlashcardSet(userId, level, title, flashcards, tags)
  }
}

export function saveUserFlashcardSet(userId, setId, level, title, flashcards, tags) {
  return {
    type: C.SAVE_USER_FLASHCARD_SET,
    userId: userId,
    payload: api.flashcardSets.saveUserFlashcardSet(userId, setId, level, title, flashcards, tags)
  }
}

// export function fetchUserStarredFlashcardsSet(id) {
//   return {
//     type: C.FETCH_USER_FLASHCARD_SETS,
//     userId: id,
//     payload: api.flashcardSets.getUserStarredFlashcardsSet(id)
//   }
// }

export function setupUserStarredFlashcardsListeners(id) {
  return dispatch => {
    dispatch({
      type: C.STARRED_USER_FLASHCARDS_ON,
      userId: id,
    })

    api.flashcardSets.setupUserStarredFlashcardsListeners(id, (results) => {
      dispatch({
        type: C.STARRED_USER_FLASHCARDS_UPDATED,
        userId: id,
        payload: results,
      })
    })
  }
}

export function teardownUserStarredFlashcardsListeners(id) {
  return dispatch => {
    dispatch({
      type: C.STARRED_USER_FLASHCARDS_OFF,
      userId: id,
    })
    api.flashcardSets.teardownUserStarredFlashcardsListeners(id)
  }
}
