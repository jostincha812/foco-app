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

function userCarddecks(user, section) {
  return (`users/section_carddecks/${user.id}/${user.level}/${section.id}`)
}

module.exports = {
  configFirebase,
  userCarddecks
}
