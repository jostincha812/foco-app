import C from '../constants'
import A from './actionTypes'

const initialState = {
  data: {},
  status: C.FB_IDLE,
  error: null,
}
export default function FlashcardsReducer (state = {}, action) {
  const s = { ... state }
  switch (action.type) {
    case A.RESET_FLASHCARDS_STATE:
      s[action.meta.namespace] = initialState
      return s

    case A.FETCH_FLASHCARD_IDS_PENDING:
      s[action.meta.namespace] = {
        data: {},
        status: C.FB_FETCHING,
        error: null,
      }
      return s
    case A.FETCH_FLASHCARD_IDS_FULFILLED:
      s[action.meta.namespace] = {
        status: C.FB_FETCHED,
        data: action.payload
      }
      return s
    case A.FETCH_FLASHCARD_IDS_REJECTED:
      s[action.meta.namespace] = {
        status: C.FB_ERROR,
        data: action.payload
      }
      return s

    case A.FETCH_FLASHCARD_PENDING:
      s[action.meta.namespace] = {
        data: {},
        status: C.FB_FETCHING,
        error: null,
      }
      return s
    case A.FETCH_FLASHCARD_FULFILLED:
      s[action.meta.namespace] = {
        status: C.FB_FETCHED,
        data: action.payload,
      }
      return s
    case A.FETCH_FLASHCARD_REJECTED:
      s[action.meta.namespace] = {
        data: {},
        status: C.FB_ERROR,
        error: action.payload,
      }
      return s

    case A.FETCH_FLASHCARDS_PENDING:
      s[action.meta.namespace] = {
        data: {},
        status: C.FB_FETCHING,
        error: null,
      }
      return s
    case A.FETCH_FLASHCARDS_FULFILLED:
      s[action.meta.namespace] = {
        data: action.payload,
        status: C.FB_FETCHED,
      }
      return s
    case A.FETCH_FLASHCARDS_REJECTED:
      s[action.meta.namespace] = {
        ...s[action.meta.namespace],
        status: C.FB_ERROR,
        error: action.payload,
      }
      return s

    case A.FETCH_FLASHCARDS_WITH_TAGS_PENDING:
      s[action.meta.namespace] = {
        data: {},
        status: C.FB_FETCHING,
        error: null,
      }
      return s
    case A.FETCH_FLASHCARDS_WITH_TAGS_FULFILLED:
      s[action.meta.namespace] = {
        status: C.FB_FETCHED,
        data: Object.assign({}, s[action.meta.namespace].data, action.payload)
      }
      return s
    case A.FETCH_FLASHCARDS_WITH_TAGS_REJECTED:
      s[action.meta.namespace] = {
        status: C.FB_ERROR,
        error: action.payload,
      }
      return s

    default:
      return state
  }
}
