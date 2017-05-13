import C from '../C'
const initialState = {
  data: null,
  dataFetched: false,
  isFetching: false,
  isStoring: false,
  fetchError: false,
  storeError: false,
}

export default function FlashcardReducer (state = initialState, action) {
  switch (action.type) {
    case C.FETCH_FLASHCARD_PENDING:
      return {
        ...state,
        data: null,
        isFetching: true,
        fetchError: false,
      }
    case C.FETCH_FLASHCARD_FULFILLED:
      return {
        ...state,
        isFetching: false,
        data: action.payload
      }
    case C.FETCH_FLASHCARD_REJECTED:
      return {
        ...state,
        isFetching: false,
        fetchError: true
      }

    case C.UPDATE_USER_FLASHCARD_PREFERENCE_PENDING:
    return {
      ...state,
      data: null,
      isStoring: true,
      storeError: false,
    }
    case C.UPDATE_USER_FLASHCARD_PREFERENCE_FULFILLED:
      return {
        ...state,
        isStoring: false,
        data: action.payload
      }
    case C.UPDATE_USER_FLASHCARD_PREFERENCE_REJECTED:
      return {
        ...state,
        isStoring: false,
        storeError: true,
      }

    default:
      return state
  }
}
