import C from '../constants'
import FirebaseAuth from './FirebaseAuth'
import { AccessManager } from '../iap'
import api from '../data/api'

import { fbAnalytics } from '../../configureFirebase'
import store from '../../configureStore'
import { actions as UserProfileActions } from '../userProfile'
import { E } from '../constants'

let _unsubscribe = null
let _authenticated = false
let _currentSessionUserActionsCounter = 0

const CurrentUser = {
  setup: (onInitialize, onLogin, onLogout, onError, onEmailVerified) => {
    const _onLogin = (user) => {
      const p = {
        ...user,
        lastActive: new Date().toUTCString(),
      }

      api.userProfile.upsertUserProfile(user.uid, p)
        .then(api.userProfile.incrementUserSessionsCount(user.uid).then(
          ({committed, snapshot}) => {
            const count = snapshot.val()
            if (committed && count == 2) {
              fbAnalytics.logEvent(E.activation_signin_no2,
                { uid: user.uid, date: p.lastActive })
            }
            if (committed && count == 3) {
              fbAnalytics.logEvent(E.activation_signin_no3,
                { uid: user.uid, date: p.lastActive })
            }
          }))
        .then(() => {
          store.dispatch(UserProfileActions.fetchUserProfile(user.uid))
          _authenticated = true
          onLogin && onLogin(user)
        })
    }

    const _onLogout = (user) => {
      _authenticated = false
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
    const initialized = FirebaseAuth.initialized
    return initialized
  },

  get authenticated() {
    return _authenticated
  },

  get profile() {
    const profile = store.getState().userProfile.data ? store.getState().userProfile.data : null
    return profile
  },

  get uid() {
    const profile = CurrentUser.profile
    return profile ? profile.uid : null
  },

  get email() {
    const profile = CurrentUser.profile
    return profile ? profile.email : null
  },

  get purchases() {
    const profile = CurrentUser.profile
    return profile ? profile.purchases : []
  },

  get sessions() {
    const profile = CurrentUser.profile
    return profile ? profile.sessions : 1
  },

  get isAdmin() {
    const profile = CurrentUser.profile
    if (profile && profile.roles && profile.roles.includes(C.ROLE_ADMIN)) {
      return true
    }
    return false
  },

  get isReviewer() {
    const profile = CurrentUser.profile || {}
    if (profile.email == 'reviewers@vpqlabs.com' ||
        profile.email == 'flyflyerson@gmail.com') {
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

  hasPurchasedProduct: (product) => {
    const purchases = CurrentUser.purchases
    return (purchases.indexOf(product) >= 0)
  },

  hasPurchasedProducts: (products) => {
    let purchased = false
    products.map(product => {
      if (CurrentUser.hasPurchasedProduct(product)) {
        purchased = true
      }
    })
    return purchased
  },

  incrementSessionUserActionsCounter: () => {
    const uid = CurrentUser.uid
    if (uid) {
      _currentSessionUserActionsCounter += 1
      api.userProfile.incrementUserActionsCounter(uid)
      if (_currentSessionUserActionsCounter % 12 == 0) {
        console.log('trigger prompt')
      }
    }
  },
}

Object.freeze(CurrentUser)
export default CurrentUser
