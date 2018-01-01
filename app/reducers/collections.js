import C from '../C'
const initialState = {
  data: {},
  status: C.FB_IDLE,
  error: null,
}

export default function CollectionsReducer (state = {}, action) {
  const s = { ...state }
  switch (action.type) {
    case C.RESET_COLLECTIONS_STATE:
      s[action.meta.namespace] = initialState
      return s

    case C.FETCH_COLLECTIONS_PENDING:
      s[action.meta.namespace] = {
        status: C.FB_FETCHING,
        error: null,
      }
      return s
    case C.FETCH_COLLECTIONS_FULFILLED:
      s[action.meta.namespace] = {
        status: C.FB_FETCHED,
        data: Object.assign({}, s[action.meta.namespace].data, action.payload),
      }
      return s
    case C.FETCH_COLLECTIONS_REJECTED:
      s[action.meta.namespace] = {
        status: C.FB_ERROR,
        error: action.payload,
      }
      return s

    // case C.CREATE_COLLECTION_PENDING:
    //   return {
    //     ...state,
    //     status: C.FB_UPDATING,
    //     error: null,
    //   }
    // case C.CREATE_COLLECTION_FULFILLED:
    //   return {
    //     ...state,
    //     status: C.FB_UPDATED,
    //     data: Object.assign({}, state.data, action.payload),
    //   }
    // case C.CREATE_COLLECTION_REJECTED:
    //   return {
    //     ...state,
    //     status: C.FB_ERROR,
    //     error: action.payload,
    //   }
    //
    // case C.UPDATE_COLLECTION_PENDING:
    //   return {
    //     ...state,
    //     status: C.FB_UPDATING,
    //     error: null,
    //   }
    // case C.UPDATE_COLLECTION_FULFILLED:
    //   return {
    //     ...state,
    //     status: C.FB_UPDATED,
    //     data: Object.assign({}, state.data, action.payload)
    //   }
    // case C.UPDATE_COLLECTION_REJECTED:
    //   return {
    //     ...state,
    //     status: C.FB_ERROR,
    //     error: action.payload,
    //   }
    //
    // case C.DELETE_COLLECTION_PENDING:
    //   return {
    //     ...state,
    //     status: C.FB_REMOVING,
    //     error: null,
    //   }
    // case C.DELETE_COLLECTION_FULFILLED:
    //   return {
    //     ...state,
    //     status: C.FB_REMOVED,
    //     data: Object.assign({}, state.data, action.payload)
    //   }
    // case C.DELETE_COLLECTION_REJECTED:
    //   return {
    //     ...state,
    //     status: C.FB_ERROR,
    //     error: action.payload,
    //   }
    //
    // case C.STARRED_USER_COLLECTION_ON:
    //   return {
    //     ...state,
    //     status: C.FB_FETCHING,
    //     error: null,
    //   }
    // case C.STARRED_USER_COLLECTION_UPDATED:
    //   return {
    //     ...state,
    //     status: C.FB_FETCHED,
    //     data: Object.assign({}, state.data, action.payload)
    //   }
    // case C.STARRED_USER_COLLECTION_OFF:
    //   return {
    //     ...state,
    //     status: C.FB_SUCCESS,
    //   }

    default:
      return state
  }
}
