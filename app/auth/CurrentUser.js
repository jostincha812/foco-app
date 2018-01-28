import C from '../C'
import firebase from '../../configureFirebase'
import FirebaseAuth from './FirebaseAuth'
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
          onLogin && onLogin()
        })
      })
    }

    const _onLogout = () => {
      _profile = null
      onLogout && onLogout()
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

  get hasPremiumAccess() {
    const profile = _profile
    let hasPremiumAccess = false

    if (profile.purchases) {
      profile.purchases.map(purchase => {
        if (purchase === C.IAP_EARLY_ADOPTER) {
          hasPremiumAccess = true
        }
        if (purchase === C.IAP_FULL_ACCESS) {
          hasPremiumAccess = true
        }
        if (purchase === C.IAP_FULL_ACCESS) {
          hasPremiumAccess = true
        }
      })
    }

    return hasPremiumAccess
  },

  signOut: () => {
    FirebaseAuth.logout()
  },

  unlockPremiumAccess: () => {
    console.log(_profile)
  }
}

Object.freeze(CurrentUser)
export default CurrentUser
