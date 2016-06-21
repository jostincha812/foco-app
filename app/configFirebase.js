import firebase, {app, database} from 'firebase';

export default function configFirebase() {
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

const wset3Ref = new Firebase("https://focoapp.firebaseio.com/wset3");
const wset2Ref = new Firebase("https://focoapp.firebaseio.com/wset2");
const usersRef = new Firebase("https://focoapp.firebaseio.com/users");

export {
  wset3Ref,
}
