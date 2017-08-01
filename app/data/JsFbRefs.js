import firebase from '../../configureRNFirebase'

const db = firebase.database
const refs = {
  flashcards: '/flashcards',
  flashcardsTags: '/flashcards_tags',
  users: '/users',
  userFlashcardSets: '/user_flashcardsets',
  userFlashcardPrefs: '/user_flashcard_prefs',
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

  userFlashcardPrefs: (key) => {
    return db().ref(`${refs.userFlashcardPrefs}/${key}`)
  },

  userFlashcardPref: (key, cardKey) => {
    return db().ref(`${refs.userFlashcardPrefs}/${key}/${cardKey}`)
  },

  userFlashcardSets: (key) => {
    return db().ref(`${refs.userFlashcardSets}/${key}`)
  },

  userFlashcardSet: (key, setKey) => {
    return db().ref(`${refs.userFlashcardSets}/${key}/${setKey}`)
  },
}
