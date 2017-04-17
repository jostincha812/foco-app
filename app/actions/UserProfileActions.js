import C from '../C'

export function fetchUserProfile() {
  return {
    type: C.FETCH_USER_PROFILE,
    payload: () => {}
  }
}
