import C from '../C'
import api from '../data/api'

export function resetFlashcardsState(ns) {
  return {
    type: C.RESET_FLASHCARDS_STATE,
    meta: {
      namespace: ns
    },
  }
}

export function fetchFlashcard(ns, id, userId) {
  return {
    type: C.FETCH_FLASHCARD,
    payload: api.flashcards.getFlashcard(id, userId),
    meta: {
      namespace: ns
    },
  }
}

export function fetchFlashcards(ns, ids, userId) {
  return {
    type: C.FETCH_FLASHCARDS,
    payload: api.flashcards.getFlashcards(ids, userId),
    meta: {
      namespace: ns
    },
  }
}

export function fetchStarredFlashcards(ns, userId) {
  return {
    type: C.FETCH_FLASHCARDS,
    payload: api.flashcards.getUserStarredFlashcards(userId),
    meta: {
      namespace: ns
    },
  }
}

export function fetchFlashcardsWithTags(ns, level, tags1, tags2) {
  return {
    type: C.FETCH_FLASHCARDS_WITH_TAGS,
    payload: api.flashcards.getFlashcardsWithTags(level, tags1, tags2),
    meta: {
      namespace: ns,
      level: level
    },
  }
}
