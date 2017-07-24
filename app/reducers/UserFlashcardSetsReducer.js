import C from '../C'
const initialState = {
  data: {},
  isReady: false,
  isFetching: false,
  isStoring: false,
  error: false,
}

export default function UserFlashcardSetsReducer (state = initialState, action) {
  switch (action.type) {
    case C.FETCH_USER_FLASHCARD_SETS_PENDING:
      return {
        ...state,
        isFetching: true,
        isReady: false,
        error: false,
      }
    case C.FETCH_USER_FLASHCARD_SETS_FULFILLED:
      return {
        ...state,
        isFetching: false,
        isReady: true,
        data: Object.assign({}, state.data, action.payload)
      }
    case C.FETCH_USER_FLASHCARD_SETS_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      }

    case C.CREATE_USER_FLASHCARD_SET_PENDING:
      return {
        ...state,
        isFetching: true,
        isReady: false,
        error: false,
      }
    case C.CREATE_USER_FLASHCARD_SET_FULFILLED:
      return {
        ...state,
        isFetching: false,
        isReady: true,
        data: Object.assign({}, state.data, action.payload)
      }
    case C.CREATE_USER_FLASHCARD_SET_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      }


    case C.STARRED_USER_FLASHCARDS_ON:
      return {
        ...state,
        isFetching: true,
        isReady: false,
        error: false,
      }
    case C.STARRED_USER_FLASHCARDS_UPDATED:
      return {
        ...state,
        isFetching: false,
        isReady: true,
        data: Object.assign({}, state.data, action.payload)
      }
    case C.STARRED_USER_FLASHCARDS_OFF:
      return {
        ...state,
        isFetching: false,
        isReady: true,
        error: false,
      }

    default:
      return state
  }
}
