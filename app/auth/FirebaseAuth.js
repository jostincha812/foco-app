import firebase from '../../configureFirebase'

import Providers from './Providers'
import fbRefs from '../data/JsFbRefs'

const FirebaseAuth = class {
  initialized = false
  user = null;
  onLogin = null;
  onLogout = null;
  onError = null;
  onEmailVerified = null;

  // @TODO
  init(googleConfig) {
    Auth.Google.configure(googleConfig);
  }

  setup = (onInitialize, onLogin, onLogout, onError, onEmailVerified) => {
    if (this.initialized) {
      this.onInitialize && this.onInitialize(this.initialized)
      return
    }
    this.initialized = true
    this.onInitialize = onInitialize
    this.onLogin = onLogin
    this.onLogout = onLogout
    this.onError = onError
    this.onEmailVerified = onEmailVerified

    return firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        // Determine if user needs to verify email
        var emailVerified = !user.providerData || !user.providerData.length || user.providerData[0].providerId != 'password' || user.emailVerified;
        firebase.analytics().setUserId(user.uid)

        const profile = {
          emailVerified: emailVerified,
          email: user.email,
          displayName: user.displayName ? user.displayName : user.email,
          photoURL: user.photoURL,
          uid: user.uid,
          providerId: user.providerId,
          providerData: user.providerData,
        }
        if (user.providerData[0].providerId == 'facebook.com') {
          profile.photoURL = user.providerData[0].photoURL
        }

        if (!this.user) {
          this.onLogin && this.onLogin(profile); // On login
        }
        this.user = user; // Store user
      } else if (this.user) {
        const user = { uid: this.user.uid }
        firebase.analytics().setUserId(null);
        this.user = null; // Clear user and logout
        this.onLogout && this.onLogout(user);
      } else {
        this.onInitialize && this.onInitialize(this.initialized)
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

  register = (name, email, password) => {
    try {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          user.sendEmailVerification();
          return user.updateProfile({displayName: name})
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
