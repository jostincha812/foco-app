import C from '../constants'
import firebase from '../../configureFirebase'
import FirebaseAuth from './FirebaseAuth'
import AccessManager from './AccessManager'
import api from '../data/api'

let _profile = null
let _unsubscribe = null

const CurrentUser = {
  setup: (onInitialize, onLogin, onLogout, onError, onEmailVerified) => {
    const _onLogin = (user) => {
      const p = {
        lastActive: new Date().toUTCString(),
        ...user
      }

      api.userProfile.upsertUserProfile(user.uid, p).then(() => {
        api.userProfile.getUserProfile(user.uid).then(profile => {
          _profile = profile
          onInitialize && onInitialize()
          onLogin && onLogin(user)
        })
      })
    }

    const _onLogout = (user) => {
      _profile = null
      onLogout && onLogout(user)
    }

    if (!FirebaseAuth.initialized) {
      _unsubscribe = FirebaseAuth.setup(
        onInitialize,
        _onLogin,
        _onLogout,
        onError,
        onEmailVerified
      )
    }
  },

  teardown: () => {
    _unsubscribe && _unsubscribe()
  },

  get initialized() {
    return FirebaseAuth.initialized
  },

  get authenticated() {
    return _profile ? true : false
  },

  get profile() {
    return _profile
  },

  get isAdmin() {
    if (_profile.roles && _profile.roles.includes(C.ROLE_ADMIN)) {
      return true
    } else {
      return false
    }
  },

  hasPremiumAccess: ({accessType, accessKey}) => {
    const purchases = _profile.purchases
    return AccessManager.hasAccess({purchases, accessType, accessKey})
  },

  signOut: () => {
    FirebaseAuth.logout()
  },

  unlockPremiumAccess: () => {
    console.log("unlockPremiumAccess()")
  },
}

Object.freeze(CurrentUser)
export default CurrentUser
