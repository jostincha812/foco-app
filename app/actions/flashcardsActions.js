import { FETCH_FLASHCARDS } from '../C'

const getFlashcards = () => {

}

export function fetchFlashcards() {
  return {
    type: FETCH_FLASHCARDS,
    payload: getFlashcards()
  }
}
