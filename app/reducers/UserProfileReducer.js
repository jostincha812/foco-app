import C from '../C'
const initialState = {
  data: null,
  status: C.FB_IDLE,
  error: null,
}

export default function UserProfileReducer (state = initialState, action) {
  switch (action.type) {
    case C.RESET_USER_PROFILE_STATE:
      return initialState

    case C.FETCH_USER_PROFILE_PENDING:
      return {
        ...state,
        data: null,
        status: C.FB_FETCHING,
        error: null,
      }
    case C.FETCH_USER_PROFILE_FULFILLED:
      return {
        ...state,
        status: C.FB_FETCHED,
        data: action.payload
      }
    case C.FETCH_USER_PROFILE_REJECTED:
      return {
        ...state,
        status: C.FB_ERROR,
        error: action.payload,
      }
    default:
      return state
  }
}
