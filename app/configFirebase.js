import firebase, {app, database} from 'firebase';

function configFirebase() {
  // TODO re-enable Firebase v3.0 initialization code
  // Initialize Firebase
  // var config = {
  //   apiKey: "AIzaSyCNyxhOk_7jKwrDC4jbVqmzjwxmb2VbSXs",
  //   authDomain: "vpqfoco.firebaseapp.com",
  //   databaseURL: "https://vpqfoco.firebaseio.com",
  //   storageBucket: "vpqfoco.appspot.com",
  // };
  // firebase.initializeApp(config);
}

const focoFbRef = new Firebase("https://focoapp.firebaseio.com/");
module.exports = configFirebase;

export {
  focoFbRef,
}
