import A from './actionTypes'
import api from '../data/api'

export function resetFlashcardsState(ns) {
  return {
    type: A.RESET_FLASHCARDS_STATE,
    meta: {
      namespace: ns
    },
  }
}

export function fetchFlashcard(ns, id, userId) {
  return {
    type: A.FETCH_FLASHCARD,
    payload: api.flashcards.getFlashcard(id, userId),
    meta: {
      namespace: ns
    },
  }
}

export function fetchFlashcards(ns, ids, userId) {
  return {
    type: A.FETCH_FLASHCARDS,
    payload: api.flashcards.getFlashcards(ids, userId),
    meta: {
      namespace: ns
    },
  }
}

export function fetchUserStarredFlashcards(ns, userId) {
  return {
    type: A.FETCH_FLASHCARDS,
    payload: api.flashcards.getUserStarredFlashcards(userId),
    meta: {
      namespace: ns
    },
  }
}

// export function fetchFlashcardsWithTags(ns, level, tags1, tags2) {
//   return {
//     type: A.FETCH_FLASHCARDS_WITH_TAGS,
//     payload: api.flashcards.getFlashcardsWithTags(level, tags1, tags2),
//     meta: {
//       namespace: ns,
//       level: level
//     },
//   }
// }
