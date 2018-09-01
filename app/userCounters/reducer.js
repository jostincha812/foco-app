import C from '../constants'
import A from './actionTypes'
const initialState = {
  data: null,
  status: C.FB_IDLE,
  error: null,
}

export default function UserCountersReducer (state = initialState, action) {
  switch (action.type) {
    case A.FETCH_USER_COUNTERS_PENDING:
      return {
        ...state,
        data: null,
        status: C.FB_FETCHING,
        error: null,
      }

    case A.INCREMENT_USER_SESSIONS_COUNTER_PENDING:
    case A.INCREMENT_USER_ACTIONS_COUNTER_PENDING:
    case A.UPSERT_USER_COUNTERS_PENDING:
      return {
        ...state,
        status: C.FB_UPDATING,
        error: null,
      }

    case A.INCREMENT_USER_SESSIONS_COUNTER_FULFILLED:
    case A.INCREMENT_USER_ACTIONS_COUNTER_FULFILLED:
    case A.FETCH_USER_COUNTERS_FULFILLED:
    case A.UPSERT_USER_PROMPT_COUNTERS_FULFILLED:
      return {
        ...state,
        status: C.FB_UPDATED,
        data: Object.assign({}, state.data, action.payload)
      }

    case A.FETCH_USER_COUNTERS_REJECTED:
    case A.INCREMENT_USER_SESSIONS_COUNTER_REJECTED:
    case A.INCREMENT_USER_ACTIONS_COUNTER_REJECTED:
    case A.UPSERT_USER_PROMPT_COUNTERS_REJECTED:
      return {
        ...state,
        status: C.FB_ERROR,
        error: action.payload,
      }

    default:
      return state
  }
}
