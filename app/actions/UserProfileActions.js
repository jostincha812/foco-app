import C from '../C'
import api from '../data/api'

export function resetUserProfileState() {
  return {
    type: C.RESET_USER_PROFILE_STATE,
  }
}

export function fetchUserProfile(uid) {
  return {
    type: C.FETCH_USER_PROFILE,
    payload: api.userProfile.getUserProfile(uid)
  }
}
