import C from '../C'
const initialState = {
  data: [],
  dataFetched: false,
  isFetching: false,
  error: false
}

export default function flashcardsReducer (state = initialState, action) {
  switch (action.type) {
    case C.FETCH_AIRLINES_DATA_PENDING:
      return {
        ...state,
        data: [],
        isFetching: true
      }
    case C.FETCH_AIRLINES_DATA_FULFILLED:
      return {
        ...state,
        isFetching: false,
        data: action.payload
      }
    case C.FETCH_AIRLINES_DATA_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    default:
      return state
  }
}
