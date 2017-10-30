import C from '../C'
import api from '../data/api'

export function resetUserProfileState() {
  return {
    type: C.RESET_USER_PROFILE_STATE,
  }
}

export function upsertUserProfile(uid, profile) {
  return {
    type: C.UPSERT_USER_PROFILE,
    payload: api.userProfile.upsertUserProfile(uid, profile)
  }
}

export function fetchUserProfile(uid) {
  return {
    type: C.FETCH_USER_PROFILE,
    payload: api.userProfile.getUserProfile(uid)
  }
}
