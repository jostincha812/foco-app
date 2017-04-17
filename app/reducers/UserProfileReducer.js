import C from '../C'
const initialState = {
  data: null,
  dataFetched: false,
  isFetching: false,
  error: false
}

export default function UserProfileReducer (state = initialState, action) {
  switch (action.type) {
    case C.FETCH_USER_PROFILE_PENDING:
      return {
        ...state,
        data: null,
        isFetching: true
      }
    case C.FETCH_USER_PROFILE_FULFILLED:
      return {
        ...state,
        isFetching: false,
        data: action.payload
      }
    case C.FETCH_USER_PROFILE_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    default:
      return state
  }
}
