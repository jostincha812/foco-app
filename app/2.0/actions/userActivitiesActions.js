import C from '../C'
import getData from '../data/api'

export function fetchUserActivities() {
  return {
    type: C.FETCH_USER_ACTIVITIES,
    payload: getData('userActivites')
  }
}
