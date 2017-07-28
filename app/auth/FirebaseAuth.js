import * as firebase from 'firebase'

import Providers from './Providers'
import fbRefs from '../data/JsFbRefs'

const FirebaseAuth = class {
  isConfigured = false
  user = null;
  profile = null;
  onUserChange = null;
  onLogout = null;
  onEmailVerified = null;
  onLogin = null;
  onError = null;

  // @TODO
  init(googleConfig) {
    Auth.Google.configure(googleConfig);
  }

  setup = (onLogin, onLogout, onEmailVerified, onError) => {
    if (this.isConfigured) {
      return
    }
    this.isConfigured = true
    this.onLogout = onLogout;
    this.onEmailVerified = onEmailVerified;
    this.onLogin = onLogin;
    this.onError = onError;

    firebase.auth().onAuthStateChanged((user)=> {

      if (user) {
        // Determine if user needs to verify email
        var emailVerified = !user.providerData || !user.providerData.length || user.providerData[0].providerId != 'password' || user.emailVerified;

        const profile = {
          emailVerified: emailVerified,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
          lastActive: new Date().toUTCString(),
        }
        if (!this.user) {
          this.onLogin && this.onLogin(profile); // On login
        }
        this.profile = profile; // Store profile
        this.user = user; // Store user
      } else if (this.user) {
        this.profile = null;
        this.user = null; // Clear user and logout
        this.onLogout && this.onLogout();
      }
    });
  }

  logout = () => {
    firebase.auth().signOut();
  }

  loginWithFacebook = () => {
    Providers.Facebook.login(['public_profile', 'email', 'user_friends'])
      .then((token) => (
        firebase.auth()
          .signInWithCredential(firebase.auth.FacebookAuthProvider.credential(token))
      ))
      .catch((err) => this.onError && this.onError(err));
  }

  loginWithGoogle = () => {
    Providers.Google.login()
      .then((token) => (
        firebase.auth()
          .signInWithCredential(firebase.auth.GoogleAuthProvider.credential(null, token))
      ))
      .catch((err) => this.onError && this.onError(err));
  }

  loginWithEmail = (email, password) => {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .catch((err) => this.onError && this.onError(err));
    } catch (e) {
      this.onError && this.onError(e);
    }
  }

  register = (username, password) => {
    try {
      firebase.auth().createUserWithEmailAndPassword(username, password)
        .then((user)=> {
          user.sendEmailVerification();
        })
        .catch((err) => this.onError && this.onError(err));
    } catch (e) {
      this.onError && this.onError(e);
    }
  }

  resendVerification = () => {
    this.user.sendEmailVerification();
  }

  resetPassword = (email) => {
    firebase.auth().sendPasswordResetEmail(email);
  }

  updatePassword = (password) => {
    this.user.updatePassword(password);
  }

  linkWithFacebook = () => {
    // @TODO
  }

  linkWithGoogle = () => {
    // @TODO
  }

  linkWithEmail = () => {
    // @TODO
  }
};

export default new FirebaseAuth();
