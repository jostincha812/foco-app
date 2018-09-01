import firebase from '../../configureFirebase'

const db = firebase.database
const refs = {
  collections: '/collections',
  flashcards: '/flashcards',
  flashcardsTags: '/flashcards_tags',
  users: '/users',
  userFlashcardPrefs: '/user_flashcard_prefs',
  userCollectionPrefs: '/user_collection_prefs',
  userCounters: '/user_counters',
  feedback: '/feedback',
}

export default JsFbRefs = {
  flashcards: () => {
    return db().ref(`${refs.flashcards}`)
  },

  flashcard: (key) => {
    return db().ref(`${refs.flashcards}/${key}`)
  },

  flashcardsTags: () => {
    return db().ref(`${refs.flashcardsTags}`)
  },

  flashcardTags: (key) => {
    return db().ref(`${refs.flashcardsTags}/${key}`)
  },

  users: () => {
    return db().ref(`${refs.users}`)
  },

  user: (key) => {
    return db().ref(`${refs.users}/${key}`)
  },

  userFlashcardPrefs: (userKey) => {
    return db().ref(`${refs.userFlashcardPrefs}/${userKey}`)
  },

  userFlashcardPref: (userKey, cardKey) => {
    return db().ref(`${refs.userFlashcardPrefs}/${userKey}/${cardKey}`)
  },

  collections: () => {
    return db().ref(`${refs.collections}`)
  },

  collection: (key) => {
    return db().ref(`${refs.collections}/${key}`)
  },

  userCollectionPrefs: (userKey) => {
    return db().ref(`${refs.userCollectionPrefs}/${userKey}`)
  },

  userCollectionPref: (userKey, collectionKey) => {
    return db().ref(`${refs.userCollectionPrefs}/${userKey}/${collectionKey}`)
  },

  userCounters: (userKey) => {
    return db().ref(`${refs.userCounters}/${userKey}`)
  },

  feedback: () => {
    return db().ref(`${refs.feedback}`)
  }
}
