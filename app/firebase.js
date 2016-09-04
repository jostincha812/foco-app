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

function fbUserCarddecksRef(user, section) {
  const loc = `/user_carddecks/${user.id}/`;
  return firebase.database().ref(loc).orderByChild('section').equalTo(section.id);
}
function fbFlashcardsRef() {
  const loc = `/flashcards/`;
  return firebase.database().ref(loc).orderByKey();
}

module.exports = {
  configFirebase,
  fbUserCarddecksRef,
  fbFlashcardsRef
}
