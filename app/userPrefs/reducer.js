import C from '../constants'
import A from './actionTypes'
const initialState = {
  data: {},
  isReady: false,
  isFetching: false,
  isStoring: false,
  error: false,
}

export default function UserPrefsReducer (state = initialState, action) {
  switch (action.type) {
    // case A.FETCH_USER_FLASHCARD_PREFS_PENDING:
    //   return {
    //     ...state,
    //     data: {},
    //     isFetching: true,
    //     isReady: false,
    //     error: false,
    //   }
    // case A.FETCH_USER_FLASHCARD_PREFS_FULFILLED:
    //   // // convert array from Promises.all() back to json object
    //   // const prefs = {}
    //   // action.payload.map(f => {
    //   //   prefs[f.id] = f
    //   // })
    //   return {
    //     ...state,
    //     isFetching: false,
    //     isReady: true,
    //     data: action.payload
    //   }
    // case A.FETCH_USER_FLASHCARD_PREFS_REJECTED:
    //   return {
    //     ...state,
    //     isFetching: false,
    //     error: true
    //   }

    case A.UPDATE_USER_FLASHCARD_PREFS_PENDING:
      return {
        ...state,
        isStoring: true,
        isFetching: false,
        error: false,
      }
    case A.UPDATE_USER_FLASHCARD_PREFS_FULFILLED:
      return {
        ...state,
        isStoring: false,
      }
    case A.UPDATE_USER_FLASHCARD_PREFS_REJECTED:
      return {
        ...state,
        isStoring: false,
        error: true,
      }

    case A.UPDATE_USER_COLLECTION_PREFS_PENDING:
      return {
        ...state,
        isStoring: true,
        isFetching: false,
        error: false,
      }
    case A.UPDATE_USER_COLLECTION_PREFS_FULFILLED:
      return {
        ...state,
        isStoring: false,
      }
    case A.UPDATE_USER_COLLECTION_PREFS_REJECTED:
      return {
        ...state,
        isStoring: false,
        error: true,
      }

    default:
      return state
  }
}
