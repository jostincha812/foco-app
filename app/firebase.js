import * as firebase from 'firebase';

// Firebase v3.0 initialization code
function configFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyBh7Np4J9iIpnNRR49jOawMzVD-3gEEybg",
    authDomain: "focoapp.firebaseapp.com",
    databaseURL: "https://focoapp.firebaseio.com",
    storageBucket: "project-4367012475013528568.appspot.com",
  };
  firebase.initializeApp(firebaseConfig);
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
