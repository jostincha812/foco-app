import C from '../C'
const initialState = {
  data: {},
  status: C.FB_NONE,
  // isReady: false,
  // isFetching: false,
  // isStoring: false,
  error: null,
}

export default function FlashcardReducer (state = initialState, action) {
  switch (action.type) {
    case C.RESET_FLASHCARDS_STATE:
      return initialState

    case C.FETCH_FLASHCARD_IDS_PENDING:
      return {
        ...state,
        data: {},
        status: C.FB_FETCHING,
        error: null,
        // isFetching: true,
        // isReady: false,
      }
    case C.FETCH_FLASHCARD_IDS_FULFILLED:
      return {
        ...state,
        status: C.FB_FETCHED,
        data: action.payload
      }
    case C.FETCH_FLASHCARD_IDS_REJECTED:
      return {
        ...state,
        status: C.FB_ERROR,
        error: action.payload,
      }

    case C.FETCH_FLASHCARD_PENDING:
      return {
        ...state,
        data: {},
        status: C.FB_FETCHING,
        error: null,
      }
    case C.FETCH_FLASHCARD_FULFILLED:
      return {
        ...state,
        status: C.FB_FETCHED,
        data: action.payload
      }
    case C.FETCH_FLASHCARD_REJECTED:
      return {
        ...state,
        status: C.FB_ERROR,
        error: action.payload,
      }

    case C.FETCH_FLASHCARDS_PENDING:
      return {
        ...state,
        data: {},
        status: C.FB_FETCHING,
        error: null,
      }
    case C.FETCH_FLASHCARDS_FULFILLED:
      return {
        ...state,
        status: C.FB_FETCHED,
        data: action.payload,
      }
    case C.FETCH_FLASHCARDS_REJECTED:
      return {
        ...state,
        status: C.FB_ERROR,
        error: action.payload,
      }

    case C.FETCH_FLASHCARDS_WITH_TAGS_PENDING:
      return {
        ...state,
        data: {},
        status: C.FB_FETCHING,
        error: null,
      }
    case C.FETCH_FLASHCARDS_WITH_TAGS_FULFILLED:
      return {
        ...state,
        status: C.FB_FETCHED,
        data: Object.assign({}, state.data, action.payload)
      }
    case C.FETCH_FLASHCARDS_WITH_TAGS_REJECTED:
      return {
        ...state,
        status: C.FB_ERROR,
        error: action.payload,
      }

    case C.UPDATE_USER_FLASHCARD_PREFERENCE_PENDING:
      return {
        ...state,
        status: C.FB_UPDATING,
        error: null,
      }
    case C.UPDATE_USER_FLASHCARD_PREFERENCE_FULFILLED:
      return {
        ...state,
        status: C.FB_UPDATED,
      }
    case C.UPDATE_USER_FLASHCARD_PREFERENCE_REJECTED:
      return {
        ...state,
        status: C.FB_ERROR,
        error: action.payload,
      }

    default:
      return state
  }
}
