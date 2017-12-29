import firebase from '../../configureFirebase'

const db = firebase.database
const refs = {
  flashcards: '/flashcards',
  flashcardsTags: '/flashcards_tags',
  users: '/users',
  userCollections: '/user_collections',
  userFlashcardPrefs: '/user_flashcard_prefs',
  userCollectionPrefs: '/user_collection_prefs',
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

  userCollections: (key) => {
    return db().ref(`${refs.userCollections}/${key}`)
  },

  userCollection: (key, collectionKey) => {
    return db().ref(`${refs.userCollections}/${key}/${collectionKey}`)
  },

  userCollectionPrefs: (key) => {
    return db().ref(`${refs.userCollectionPrefs}/${key}`)
  },

  userCollectionPref: (key, collectionKey) => {
    return db().ref(`${refs.userCollectionPrefs}/${key}/${collectionKey}`)
  },

}
