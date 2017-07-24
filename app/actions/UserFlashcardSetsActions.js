import C from '../C'
import api from '../data/api'

export function fetchFeaturedFlashcardSets(id) {
  return {
    type: C.FETCH_USER_FLASHCARD_SETS,
    userId: id,
    payload: api.flashcardSets.getFeaturedFlashcardSets(id)
  }
}

export function fetchUserFlashcardSets(id) {
  return {
    type: C.FETCH_USER_FLASHCARD_SETS,
    userId: id,
    payload: api.flashcardSets.getUserFlashcardSets(id)
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
