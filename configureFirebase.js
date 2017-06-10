import * as firebase from 'firebase'

// Initialize Firebase
const fbConfig = {
  apiKey: "AIzaSyBh7Np4J9iIpnNRR49jOawMzVD-3gEEybg",
  authDomain: "focoapp.firebaseapp.com",
  databaseURL: "https://focoapp.firebaseio.com",
  projectId: "project-4367012475013528568",
  storageBucket: "project-4367012475013528568.appspot.com",
  messagingSenderId: "337229219663"
}

export default function configureFirebase() {
  firebase.initializeApp(fbConfig)
}
