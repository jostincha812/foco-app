import C from '../C'
import api from '../data/api'

export function fetchFeaturedFlashcardSets() {
  const id = C.FOCO_WSET3
  return {
    type: C.FETCH_USER_FLASHCARD_SETS,
    userId: id,
    payload: api.flashcardSets.getFeaturedFlashcardSets(id)
  }
}

export function fetchUserStarredFlashcardsSet(id) {
  return {
    type: C.FETCH_USER_FLASHCARD_SETS,
    userId: id,
    payload: api.flashcardSets.getUserStarredFlashcardsSet(id)
  }
}

export function fetchUserFlashcardSets(id) {
  return {
    type: C.FETCH_USER_FLASHCARD_SETS,
    userId: id,
    payload: api.flashcardSets.getUserFlashcardSets(id)
  }
}
