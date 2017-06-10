import * as firebase from 'firebase'

const db = firebase.database
const refs = {
  flashcards: '/flashcards',
  flashcardsTags: '/flashcards_tags',
  users: '/users',
  userFlashcardSets: '/user_flashcardsets',
  userPrefs: '/user_prefs',
}

export default JsFbRefs = {
  flashcards: () => {
    return db().ref(`${refs.flashcards}`)
  },

  flashcard: (key) => {
    return db().ref(`${refs.flashcards}/${key}`)
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

  userPrefs: (key, prefsKey) => {
    return db().ref(`${refs.userPrefs}/${key}/${prefsKey}`)
  },

  userFlashcardSets: (key) => {
    return db().ref(`${refs.userFlashcardSets}/${key}`)
  },

  userFlashcardSet: (key, setKey) => {
    return db().ref(`${refs.userFlashcardSets}/${key}/${setKey}`)
  },
}
