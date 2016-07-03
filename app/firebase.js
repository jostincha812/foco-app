import firebase, {app, database} from 'firebase';

const wset3Ref = new Firebase("https://focoapp.firebaseio.com/wset3");
const wset2Ref = new Firebase("https://focoapp.firebaseio.com/wset2");
const usersRef = new Firebase("https://focoapp.firebaseio.com/users");

export default F = {
  wset2: wset2Ref,
  wset3: wset3Ref,
  users: usersRef
}

export function configFirebase() {
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
