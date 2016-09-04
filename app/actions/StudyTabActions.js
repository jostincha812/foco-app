import firebase from 'firebase';

import { fbUserCarddecksRef, fbFlashcardsRef } from '../firebase';

import C from '../constants';

import { currentUser } from '../data/User';

// --- Cardsdeck actions ---//
function requestDecks(section) {
  return {
    type: C.REQUEST_SECTION_DECKS,
    section,
  }
}
function receiveDecks(section, json) {
  return {
    type: C.RECEIVE_SECTION_DECKS,
    section,
    carddecks: json,
    receivedAt: Date.now()
  }
}
function fetchDecks(section) {
  return dispatch => {
    dispatch(requestDecks(section));

    // fetch user decks for section from Firebase
    fbUserCarddecksRef(currentUser.id, section.id).on('value', function(snapshot) {
      dispatch(receiveDecks(section, snapshot.val()))
    });
  }
}
function shouldFetchDecks(state, section) {
  const decksState = state.carddecksBySection[section.id];
  if (!decksState) {
    return true
  } else if (decksState.isFetching) {
    return false
  } else {
    return decksState.didInvalidate
  }
}
export function fetchDecksIfNeeded(section) {
  return (dispatch, getState) => {
    const state = getState().get(C.S_STUDYTAB)
    if (shouldFetchDecks(state, section)) {
      return dispatch(fetchDecks(section))
    }
  }
}

// --- flashcards actions ---//
function requestFlashcards(carddeck) {
  return {
    type: C.REQUEST_DECK_CARDS,
    carddeck,
  }
}
function receiveFlashcards(carddeck, json) {
  return {
    type: C.RECEIVE_DECK_CARDS,
    carddeck,
    flashcards: json,
    receivedAt: Date.now()
  }
}
function fetchFlashcards(carddeck) {
  return dispatch => {
    dispatch(requestFlashcards(carddeck));

    var promises = [];
    var flashcards = {};

    // retrieve each flashcard from firebase
    carddeck.flashcards.forEach(function(flashcardId) {
      promises.push(fbFlashcardsRef(flashcardId).once('value').then(function(snapshot) {
        if (snapshot.val()) {
          flashcards[snapshot.key] = snapshot.val();
        }
      }));
    });

    // wait for all promises to complete before dispatching recieveFlashcards action
    Promise.all(promises).then(function() {
      dispatch(receiveFlashcards(carddeck, flashcards))
    });
  }
  //
  //   // TODO replace with call to Firebase
  //   console.log(carddeck);
  //   return fetch(`http://www.reddit.com/r/Showerthoughts.json`)
  //     .then(response => response.json())
  //     .then(json => dispatch(receiveFlashcards(carddeck, flashcards)))
  // }
}
function shouldFetchFlashcards(state, carddeck) {
  const cardsState = state.flashcardsByCarddeck[carddeck.id];
  if (!cardsState) {
    return true
  } else if (cardsState.isFetching) {
    return false
  } else {
    return cardsState.didInvalidate
  }
}
export function fetchFlashcardsIfNeeded(carddeck) {
  return (dispatch, getState) => {
    const state = getState().get(C.S_STUDYTAB)
    if (shouldFetchFlashcards(state, carddeck)) {
      return dispatch(fetchFlashcards(carddeck))
    }
  }
}
