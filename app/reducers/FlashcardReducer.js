import C from '../C'
const initialState = {
  data: {},
  isReady: false,
  isFetching: false,
  isStoring: false,
  error: false,
}

export default function FlashcardReducer (state = initialState, action) {
  switch (action.type) {
    case C.FETCH_FLASHCARD_IDS_PENDING:
      return {
        ...state,
        data: {},
        isFetching: true,
        isReady: false,
        error: false,
      }
    case C.FETCH_FLASHCARD_IDS_FULFILLED:
      return {
        ...state,
        isFetching: false,
        isReady: true,
        data: action.payload
      }
    case C.FETCH_FLASHCARD_IDS_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      }

    case C.FETCH_FLASHCARD_PENDING:
      return {
        ...state,
        data: {},
        isFetching: true,
        isReady: false,
        error: false,
      }
    case C.FETCH_FLASHCARD_FULFILLED:
      return {
        ...state,
        isFetching: false,
        isReady: true,
        data: action.payload
      }
    case C.FETCH_FLASHCARD_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      }

    case C.FETCH_FLASHCARDS_PENDING:
      return {
        ...state,
        data: {},
        isFetching: true,
        isReady: false,
        error: false,
      }
    case C.FETCH_FLASHCARDS_FULFILLED:
      // convert array from Promises.all() back to json object
      const flashcards = {}
      action.payload.map(f => {
        flashcards[f.id] = f
      })
      return {
        ...state,
        isFetching: false,
        isReady: true,
        data: flashcards
      }
    case C.FETCH_FLASHCARDS_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      }

    case C.UPDATE_USER_FLASHCARD_PREFERENCE_PENDING:
      return {
        ...state,
        isStoring: true,
        isFetching: false,
        error: false,
      }
    case C.UPDATE_USER_FLASHCARD_PREFERENCE_FULFILLED:
      return {
        ...state,
        isStoring: false,
      }
    case C.UPDATE_USER_FLASHCARD_PREFERENCE_REJECTED:
      return {
        ...state,
        isStoring: false,
        error: true,
      }

    default:
      return state
  }
}
