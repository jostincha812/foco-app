import C from '../C'
const initialState = {
  data: {},
  status: C.FB_NONE,
  error: null,
}

export default function UserFlashcardSetsReducer (state = initialState, action) {
  switch (action.type) {
    case C.FETCH_USER_FLASHCARD_SETS_PENDING:
      return {
        ...state,
        status: C.FB_FETCHING,
        error: null,
      }
    case C.FETCH_USER_FLASHCARD_SETS_FULFILLED:
      return {
        ...state,
        status: C.FB_FETCHED,
        data: Object.assign({}, state.data, action.payload),
      }
    case C.FETCH_USER_FLASHCARD_SETS_REJECTED:
      return {
        ...state,
        status: C.FB_ERROR,
        error: action.payload,
      }

    case C.CREATE_USER_FLASHCARD_SET_PENDING:
      return {
        ...state,
        status: C.FB_UPDATING,
        error: null,
      }
    case C.CREATE_USER_FLASHCARD_SET_FULFILLED:
      return {
        ...state,
        status: C.FB_UPDATED,
        data: Object.assign({}, state.data, action.payload),
      }
    case C.CREATE_USER_FLASHCARD_SET_REJECTED:
      return {
        ...state,
        status: C.FB_ERROR,
        error: action.payload,
      }

    case C.SAVE_USER_FLASHCARD_SET_PENDING:
      return {
        ...state,
        status: C.FB_UPDATING,
        error: null,
      }
    case C.SAVE_USER_FLASHCARD_SET_FULFILLED:
      return {
        ...state,
        status: C.FB_UPDATED,
        data: Object.assign({}, state.data, action.payload)
      }
    case C.SAVE_USER_FLASHCARD_SET_REJECTED:
      return {
        ...state,
        status: C.FB_ERROR,
        error: action.payload,
      }

    case C.DELETE_USER_FLASHCARD_SET_PENDING:
      return {
        ...state,
        status: C.FB_REMOVING,
        error: null,
      }
    case C.DELETE_USER_FLASHCARD_SET_FULFILLED:
      return {
        ...state,
        status: C.FB_REMOVED,
        data: Object.assign({}, state.data, action.payload)
      }
    case C.DELETE_USER_FLASHCARD_SET_REJECTED:
      return {
        ...state,
        status: C.FB_ERROR,
        error: action.payload,
      }

    case C.STARRED_USER_FLASHCARDS_ON:
      return {
        ...state,
        status: C.FB_FETCHING,
        error: null,
      }
    case C.STARRED_USER_FLASHCARDS_UPDATED:
      return {
        ...state,
        status: C.FB_SUCCESS,
        data: Object.assign({}, state.data, action.payload)
      }
    case C.STARRED_USER_FLASHCARDS_OFF:
      return {
        ...state,
        status: C.FB_SUCCESS,
      }

    default:
      return state
  }
}
