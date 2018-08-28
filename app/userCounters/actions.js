import A from './actionTypes'
import api from '../data/api'

export function fetchUserCounters(uid) {
  return {
    type: A.FETCH_USER_COUNTERS,
    payload: api.userProfile.fetchUserCounters(uid)
  }
}

export function incrementUserSessionsCounter(uid) {
  return {
    type: A.INCREMENT_USER_SESSIONS_COUNTER,
    payload: api.userProfile.incrementUserSessionsCounter(uid)
  }
}

export function incrementUserActionsCounter(uid) {
  return {
    type: A.INCREMENT_USER_ACTIONS_COUNTER,
    payload: api.userProfile.incrementUserActionsCounter(uid)
  }
}

export function upsertPromptCounters(uid, counters) {
  return {
    type: A.UPSERT_USER_PROMPT_COUNTERS,
    payload: api.userProfile.upsertUserPromptCounters(uid, counters)
  }
}
