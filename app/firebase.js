import firebase from 'firebase';

function configFirebase() {
  // Firebase v3.0 initialization code
  var config = {
    apiKey: "AIzaSyCNyxhOk_7jKwrDC4jbVqmzjwxmb2VbSXs",
    authDomain: "focoapp.firebaseapp.com",
    databaseURL: "https://focoapp.firebaseio.com",
    storageBucket: "focoapp.appspot.com",
  };
  firebase.initializeApp(config);
}

function fbUserCarddecksLoc(user, section) {
  return (`users/${user.id}/section_carddecks/${user.level}/${section.id}`)
}
function fbFlashcardsLoc() {
  return (`flashcards/`);
}

module.exports = {
  configFirebase,
  fbUserCarddecksLoc,
  fbFlashcardsLoc
}
