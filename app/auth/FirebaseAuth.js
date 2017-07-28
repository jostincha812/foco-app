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

  init(googleConfig) {
    Auth.Google.configure(googleConfig);
  }

  setup = (onLogin, onUserChange, onLogout, onEmailVerified, onError) => {
    if (this.isConfigured) {
      return
    }
    this.isConfigured = true
    this.onUserChange = onUserChange;
    this.onLogout = onLogout;
    this.onEmailVerified = onEmailVerified;
    this.onLogin = onLogin;
    this.onError = onError;

    firebase.auth().onAuthStateChanged((user)=> {

      if (user) {
        // Determine if user needs to verify email
        var emailVerified = !user.providerData || !user.providerData.length || user.providerData[0].providerId != 'password' || user.emailVerified;

        // Upsert profile information
        var profileRef = fbRefs.users().child(user.uid)
        profileRef.update({
          emailVerified: emailVerified,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })

        profileRef.on('value', (profile)=> {
          const val = profile.val();

          // Email become verified in session
          if (val.emailVerified && (this.profile && !this.profile.val().emailVerified)) {
            this.onEmailVerified && this.onEmailVerified();
          }

          if (!this.user) {
            this.onLogin && this.onLogin(user, val); // On login
          } else if (val) {
            this.onUserChange && this.onUserChange(user, val); // On updated
          }

          this.profile = profile; // Store profile
          this.user = user; // Store user
        });

      } else if (this.user) {
        this.profile = null;
        this.user = null; // Clear user and logout
        this.onLogout && this.onLogout();
      }
    });
  }

  login = (email, password) => {
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

  logout = () => {
    firebase.auth().signOut();
  }

  update = (data) => {
    var profileRef = fbRefs.users().child(user.uid)
    return profileRef.update(data);
  }

  resetPassword = (email) => {
    firebase.auth().sendPasswordResetEmail(email);
  }

  updatePassword = (password) => {
    this.user.updatePassword(password);
  }

  linkWithGoogle = () => {
    // @TODO
  }

  linkWithFacebook = () => {
    // @TODO
  }

  linkWithEmail = () => {
    // @TODO
  }
};

export default new FirebaseAuth();
