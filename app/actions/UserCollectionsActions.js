import C from '../C'
import api from '../data/api'

export function resetUserCollectionsState(ns) {
  return {
    type: C.RESET_USER_COLLECTIONS_STATE,
    meta: {
      namespace: ns
    }
  }
}

export function fetchCollections(ns, ownerId, userId) {
  return {
    type: C.FETCH_USER_COLLECTIONS,
    payload: api.collections.getCollections(ownerId, userId),
    meta: {
      namespace: ns,
      ownerId: ownerId,
      userId: userId
    }
  }
}

export function fetchUserBookmarkedCollections(ns, userId) {
  const filterKey = C.KEY_PREF_BOOKMARKED
  return {
    type: C.FETCH_USER_COLLECTIONS,
    payload: api.collections.getUserBookmarkedCollections(userId, filterKey),
    meta: {
      namespace: ns,
      userId: userId,
    }
  }
}

export function createUserCollection(userId, data) {
  return {
    type: C.CREATE_USER_COLLECTION,
    userId: userId,
    payload: api.collections.createUserCollection(userId, data)
  }
}

export function saveUserCollection(userId, data) {
  return {
    type: C.SAVE_USER_COLLECTION,
    userId: userId,
    payload: api.collections.saveUserCollection(userId, data)
  }
}

export function deleteUserCollection(userId, setId) {
  return {
    type: C.DELETE_USER_COLLECTION,
    userId: userId,
    payload: api.collections.deleteUserCollection(userId, setId)
  }
}

// NOTE: one time only -- use setupUserStarredFlashcardsListeners below for auto-refresh
export function fetchUserStarredCollection(userId) {
  return {
    type: C.FETCH_USER_COLLECTIONS,
    userId: userId,
    payload: api.collections.getUserStarredCollection(userId)
  }
}

export function setupUserStarredCollectionListeners(userId) {
  return dispatch => {
    dispatch({
      type: C.STARRED_USER_COLLECTION_ON,
      userId: userId,
    })

    api.collections.setupUserStarredCollectionListeners(userId, (results) => {
      dispatch({
        type: C.STARRED_USER_COLLECTION_UPDATED,
        userId: userId,
        payload: results,
      })
    })
  }
}

export function teardownUserStarredCollectionListeners(userId) {
  return dispatch => {
    dispatch({
      type: C.STARRED_USER_COLLECTION_OFF,
      userId: userId,
    })
    api.collections.teardownUserStarredCollectionListeners(userId)
  }
}
