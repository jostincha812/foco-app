import C from '../C'
import api from '../data/api'

export function fetchUserFlashcardSets(id) {
  return {
    type: C.FETCH_USER_FLASHCARD_SETS,
    userId: id,
    payload: api.flashcardSets.getUserFlashcardSets(id)
  }
}
