import C from '../constants';
import StudyTabNavigationReducer from './StudyTabNavigationReducer';

export default StudyTabNavigationReducer;

const initialState = {
  key: C.S_STUDYTAB,
  isFetching: false,
  didInvalidate: false,
  decks: [],
};
function decks(state = initialState, action) {
  switch (action.type) {
    case C.INVALIDATE_SECTION:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case C.REQUEST_SECTION_DECKS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case C.RECEIVE_SECTION_DECKS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.decks,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}
export function StudyTabReducer(state = initialState, action) {
  switch (action.type) {
    case C.INVALIDATE_SECTION:
    case C.RECEIVE_SECTION_DECKS:
    case C.REQUEST_SECTION_DECKS:
      return Object.assign({}, state, {
        [action.section]: decks(state[action.section], action)
      })
    default:
      return state
  }
}
