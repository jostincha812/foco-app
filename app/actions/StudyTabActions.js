import C from '../constants';
import { push } from './NavigationActions';

function requestDecks(section) {
  return {
    type: C.REQUEST_DECKS,
    section,
  }
}

function receiveDecks(section, json) {
  return {
    type: C.RECEIVE_DECKS,
    section,
    decks: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function fetchDecks(section) {
  return dispatch => {
    dispatch(requestDecks(section));
    // return fetch(`http://www.reddit.com/r/${subreddit}.json`)
    //   .then(response => response.json())
    //   .then(json => dispatch(receivePosts(subreddit, json)))
  }
}

function shouldFetchDecks(state, section) {
  const sectionId = section.id;
  const decks = state.get(C.S_STUDYTAB).decks[sectionId];
  if (!decks) {
    return true
  } else if (decks.isFetching) {
    return false
  } else {
    return decks.didInvalidate
  }
}

export function fetchDecksIfNeeded(section) {
  return (dispatch, getState) => {
    if (shouldFetchDecks(getState(), section)) {
      return dispatch(fetchDecks(section))
    }
  }
}
