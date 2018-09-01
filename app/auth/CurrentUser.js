import moment from 'moment'

import C from '../constants'
import FirebaseAuth from './FirebaseAuth'
import { AccessManager } from '../iap'
import api from '../data/api'

import { fbAnalytics } from '../../configureFirebase'
import store from '../../configureStore'
import { actions as UserProfileActions } from '../userProfile'
import { actions as UserCountersActions } from '../userCounters'
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
      _currentSessionUserActionsCounter = 0

      api.userProfile.upsertUserProfile(user.uid, p)
        .then(() => {
          // TODO find a place to log these
          //     if (committed && count == 2) {
          //       fbAnalytics.logEvent(E.activation_signin_no2,
          //         { uid: user.uid, date: p.lastActive })
          //     }
          //     if (committed && count == 3) {
          //       fbAnalytics.logEvent(E.activation_signin_no3,
          //         { uid: user.uid, date: p.lastActive })
          //     }
          store.dispatch(UserCountersActions.incrementUserSessionsCounter(user.uid))
          store.dispatch(UserCountersActions.fetchUserCounters(user.uid))
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
    if (!profile || !profile.purchases) {
      return C.IAP_FREE_ACCESS
    }

    if (AccessManager.hasAccess({accessRequired: C.ACCESS_FULL})) {
      return C.IAP_FULL_ACCESS
    } else {
      return profile.purchases[0]
    }
  },

  get counters() {
    const counters = store.getState().userCounters.data ? store.getState().userCounters.data : {}
    return counters
  },

  get sessionsCount() {
    const counters = CurrentUser.counters
    return counters.sessions ? counters.sessions : 1
  },

  get actionsCount() {
    const counters = CurrentUser.counters
    return counters.actions ? counters.actions : 0
  },

  get shouldRequestReview() {
    const profile = CurrentUser.profile
    const counters = CurrentUser.counters
    let shouldRequest = false

    const firstSession = 2
    const firstActions = 35
    const minDays = 12
    const minSessions = 25
    const minActions = 275

    if (profile) {
      if ((CurrentUser.sessions == firstSession) && (_currentSessionUserActionsCounter == firstActions)) {
        shouldRequest = true
      }

      let nextPromptDate = moment(counters.next_prompt_date) || moment().add(minDays, 'days')
      let nextPromptSession = counters.next_prompt_session || CurrentUser.sessionsCount + minSessions
      let nextPromptAction = counters.next_prompt_action || CurrentUser.actionsCount + minActions
      const days = nextPromptDate.diff(moment(), 'days')
      const sessions = nextPromptSession - CurrentUser.sessionsCount
      const actions = nextPromptAction - CurrentUser.actionsCount
      if (days <= 0 && sessions <= 0 && actions <= 0) {
        shouldRequest = true
      }

      if (shouldRequest ||
          !counters.next_prompt_date ||
          !counters.next_prompt_session ||
          !counters.next_prompt_action) {
        nextPromptDate = moment().add(minDays, 'days')
        nextPromptSession = CurrentUser.sessionsCount + minSessions
        nextPromptAction = CurrentUser.actionsCount + minActions

        store.dispatch(UserCountersActions.upsertPromptCounters(profile.uid, {
          next_prompt_date: nextPromptDate.format('YYYY-MM-DD'),
          next_prompt_session: nextPromptSession,
          next_prompt_action: nextPromptAction
        }))
      }
    }

    return shouldRequest
  },

  addPurchase: ({productId, transaction, onComplete}) => {
    const profile = CurrentUser.profile
    const purchases = new Set(profile.purchases)
    purchases.add(productId)
    store.dispatch(UserProfileActions.upsertUserPurchases(profile.uid, Array.from(purchases)))
      .then(() => store.dispatch(UserProfileActions.insertUserTransaction(profile.uid, transaction)))
      .then(() => store.dispatch(UserProfileActions.fetchUserProfile(profile.uid)))
      .then(() => onComplete())
  },

  hasPurchasedProduct: (product) => {
    const purchases = CurrentUser.purchases || []
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
      store.dispatch(UserCountersActions.incrementUserActionsCounter(uid))
    }
  },
}

Object.freeze(CurrentUser)
export default CurrentUser
