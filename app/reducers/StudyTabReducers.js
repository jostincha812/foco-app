import C from '../constants';
import StudyTabNavigationReducer from './StudyTabNavigationReducer';

export default StudyTabNavigationReducer;

const initialState = {
  key: C.S_STUDYTAB,
  selectedSection: "",
  selectedCarddeck: "",

  sections: {
    isFetching: false,
    didInvalidate: true,
    lastUpdated: 0,
    items: []
  },

  carddecksBySection: {},
  flashcardsByCarddeck: {},

  entities: {
    sections: {},
    carddecks: {},
    flashcards: {},
  }
};
function carddecksReducer(state, action) {
  switch (action.type) {
    case C.INVALIDATE_SECTION_DECKS:
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
        items: action.carddecks,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function flashcardsReducer(state, action) {
  switch (action.type) {
    case C.INVALIDATE_DECK_CARDS:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case C.REQUEST_DECK_CARDS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case C.RECEIVE_DECK_CARDS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.flashcards,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

export function StudyTabReducer(state = initialState, action) {
  switch (action.type) {
    case C.INVALIDATE_SECTION_DECKS:
    case C.RECEIVE_SECTION_DECKS:
    case C.REQUEST_SECTION_DECKS:
      const sectionId = action.section.id;
      return Object.assign({}, state, {
        carddecksBySection: {
          [sectionId]: carddecksReducer(state.carddecksBySection[sectionId], action)
        }
      })
    case C.INVALIDATE_DECK_CARDS:
    case C.RECEIVE_DECK_CARDS:
    case C.REQUEST_DECK_CARDS:
      const deckId = action.carddeck.id;
      return Object.assign({}, state, {
        flashcardsByCarddeck: {
          [deckId]: flashcardsReducer(state.flashcardsByCarddeck[deckId], action)
        }
      })
    default:
      return state
  }
}
