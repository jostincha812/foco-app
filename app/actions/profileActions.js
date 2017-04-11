import { FETCH_USER_PROFILE } from '../C'

const getUserProfile = () => {

}

export function fetchUserProfile() {
  return {
    type: FETCH_USER_PROFILE,
    payload: getUserProfile()
  }
}
