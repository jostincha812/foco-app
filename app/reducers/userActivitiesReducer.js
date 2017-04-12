import C from '../C'
const initialState = {
  data: [],
  dataFetched: false,
  isFetching: false,
  error: false
}

export default function flashcardsReducer (state = initialState, action) {
  switch (action.type) {
    case C.FETCH_USER_ACTIVITIES_PENDING:
      return {
        ...state,
        data: [],
        isFetching: true
      }
    case C.FETCH_USER_ACTIVITIES_FULFILLED:
      return {
        ...state,
        isFetching: false,
        data: action.payload
      }
    case C.FETCH_USER_ACTIVITIES_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    default:
      return state
  }
}
