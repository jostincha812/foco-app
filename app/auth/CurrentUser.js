import C from '../constants'
// import firebase from '../../configureFirebase'
import FirebaseAuth from './FirebaseAuth'
import { AccessManager } from '../iap'
import api from '../data/api'

import store from '../../configureStore'
import { actions as UserProfileActions } from '../userProfile'

// let profile = null
let _unsubscribe = null

const CurrentUser = {
  setup: (onInitialize, onLogin, onLogout, onError, onEmailVerified) => {
    const _onLogin = (user) => {
      const p = {
        lastActive: new Date().toUTCString(),
        ...user
      }

      api.userProfile.upsertUserProfile(user.uid, p).then(() => {
        store.dispatch(UserProfileActions.fetchUserProfile(user.uid))
        // api.userProfile.getUserProfile(user.uid).then(profile => {
          // profile = profile
          onInitialize && onInitialize()
          onLogin && onLogin(user)
        // })
      })
    }

    const _onLogout = (user) => {
      profile = null
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

  signOut: () => {
    FirebaseAuth.logout()
  },

  get initialized() {
    return FirebaseAuth.initialized
  },

  get authenticated() {
    return store.getState().userProfile ? true : false
    // return profile ? true : false
  },

  get profile() {
    return store.getState().userProfile.data ? store.getState().userProfile.data : null
  },

  get purchases() {
    const profile = CurrentUser.profile
    return profile ? profile.purchases : []
  },

  get isAdmin() {
    const profile = CurrentUser.profile
    if (profile && profile.roles && profile.roles.includes(C.ROLE_ADMIN)) {
      return true
    }
    return false
  },

  get isReviewer() {
    // TODO use dev flag
    const profile = CurrentUser.profile
    if (profile && profile.email == 'reviewers@vpqlabs.com') {
      return true
    }
    return false
  },

  get accessLevel() {
    const profile = CurrentUser.profile
    if (profile == null) {
      return C.IAP_FREE_ACCESS
    }

    if (AccessManager.hasAccess({accessType: C.ACCESS_FULL, purchases:profile.purchases})) {
      return C.IAP_FULL_ACCESS
    } else {
      return profile.purchases[0]
    }
  },

  addPurchase: ({productId, transaction, onComplete}) => {
    const profile = CurrentUser.profile
    const purchases = new Set(profile.purchases)
    purchases.add(productId)
    api.userProfile.upsertUserPurchases(profile.uid, Array.from(purchases)).then(purchased => {
      profile.purchases = purchased
      onComplete()
    })
    api.userProfile.upsertUserTransaction(profile.uid, transaction)
  },
}

Object.freeze(CurrentUser)
export default CurrentUser
