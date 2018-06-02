import A from './actionTypes'
import api from '../data/api'

export function resetUserProfileState() {
  return {
    type: A.RESET_USER_PROFILE_STATE,
  }
}

export function fetchUserProfile(uid) {
  return {
    type: A.FETCH_USER_PROFILE,
    payload: api.userProfile.getUserProfile(uid)
  }
}

export function upsertUserProfile(uid, profile) {
  return {
    type: A.UPSERT_USER_PROFILE,
    payload: api.userProfile.upsertUserProfile(uid, profile)
  }
}

export function upsertUserPurchases(uid, purchases) {
  return {
    type: A.UPSERT_USER_PURCHASES,
    payload: api.userProfile.upsertUserPurchases(uid, purchases)
  }
}
