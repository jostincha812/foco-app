import C from '../constants'
import A from './actionTypes'
const initialState = {
  data: null,
  status: C.FB_IDLE,
  error: null,
}

export default function UserProfileReducer (state = initialState, action) {
  switch (action.type) {
    case A.RESET_USER_PROFILE_STATE:
      return initialState

    case A.UPSERT_USER_PROFILE_PENDING:
      return {
        ...state,
        data: null,
        status: C.FB_UPDATING,
        error: null,
      }
    case A.UPSERT_USER_PROFILE_FULFILLED:
      return {
        ...state,
        status: C.FB_UPDATED,
        data: action.payload
      }
    case A.UPSERT_USER_PROFILE_REJECTED:
      return {
        ...state,
        status: C.FB_ERROR,
        error: action.payload,
      }

    case A.FETCH_USER_PROFILE_PENDING:
      return {
        ...state,
        data: null,
        status: C.FB_FETCHING,
        error: null,
      }
    case A.FETCH_USER_PROFILE_FULFILLED:
      return {
        ...state,
        status: C.FB_FETCHED,
        data: action.payload
      }
    case A.FETCH_USER_PROFILE_REJECTED:
      return {
        ...state,
        status: C.FB_ERROR,
        error: action.payload,
      }
    default:
      return state
  }
}
