import firebase from 'firebase';

function configFirebase() {
  // Firebase v3.0 initialization code
  var config = {
    apiKey: 'AIzaSyCNyxhOk_7jKwrDC4jbVqmzjwxmb2VbSXs',
    authDomain: 'focoapp.firebaseapp.com',
    databaseURL: 'https://focoapp.firebaseio.com',
    storageBucket: 'focoapp.appspot.com',
  };
  firebase.initializeApp(config);
}

function fbUserCarddecksRef(userId, sectionId) {
  const loc = `/user_carddecks/${userId}/`;
  return firebase.database().ref(loc).orderByChild('section').equalTo(sectionId);
}
function fbFlashcardsRef(flashcardId) {
  const loc = `/flashcards/${flashcardId}`;
  return firebase.database().ref(loc);
}

module.exports = {
  configFirebase,
  fbUserCarddecksRef,
  fbFlashcardsRef
}
