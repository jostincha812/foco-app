import C from '../C'
import A from './actionTypes'
import api from '../data/api'

export function resetCollectionsState(ns) {
  return {
    type: A.RESET_COLLECTIONS_STATE,
    meta: {
      namespace: ns
    }
  }
}

export function fetchCollections(ns, ownerId, userId) {
  return {
    type: A.FETCH_COLLECTIONS,
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
    type: A.FETCH_COLLECTIONS,
    payload: api.collections.getUserBookmarkedCollections(userId, filterKey),
    meta: {
      namespace: ns,
      userId: userId,
    }
  }
}

// export function createUserCollection(userId, data) {
//   return {
//     type: A.CREATE_USER_COLLECTION,
//     payload: api.collections.createUserCollection(userId, data)
//   }
// }
//
// export function fetchUserCollection(userId, data) {
//   return {
//     type: A.CREATE_USER_COLLECTION,
//     payload: api.collections.getUserCollection(userId, data)
//   }
// }
//
// export function upsertUserCollection(userId, data) {
//   return {
//     type: A.SAVE_USER_COLLECTION,
//     payload: api.collections.upsertUserCollection(userId, data)
//   }
// }
//
// export function deleteUserCollection(userId, setId) {
//   return {
//     type: A.DELETE_USER_COLLECTION,
//     payload: api.collections.deleteUserCollection(userId, setId)
//   }
// }

// NOTE: one time only -- use setupUserStarredFlashcardsListeners below for auto-refresh
// export function fetchUserStarredCollection(userId) {
//   return {
//     type: A.FETCH_USER_COLLECTIONS,
//     payload: api.collections.getUserStarredCollection(userId)
//   }
// }
//
// export function setupUserStarredCollectionListeners(userId) {
//   return dispatch => {
//     dispatch({
//       type: A.STARRED_USER_COLLECTION_ON,
//     })
//
//     api.collections.setupUserStarredCollectionListeners(userId, (results) => {
//       dispatch({
//         type: A.STARRED_USER_COLLECTION_UPDATED,
//         payload: results,
//       })
//     })
//   }
// }
//
// export function teardownUserStarredCollectionListeners(userId) {
//   return dispatch => {
//     dispatch({
//       type: A.STARRED_USER_COLLECTION_OFF,
//     })
//     api.collections.teardownUserStarredCollectionListeners(userId)
//   }
// }
