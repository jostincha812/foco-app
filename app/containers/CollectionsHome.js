import React from 'react'
import { connect } from 'react-redux'

import C, { E } from '../C'
import BaseCollectionsListContainer from './BaseCollectionsListContainer'

import { resetCollectionsState, fetchUserBookmarkedCollections } from '../actions/collections'
import { updateUserCollectionPref } from '../actions/userPrefs'

class CollectionHome extends BaseCollectionsListContainer {
  _fetchData() {
    const user = this.props.user
    this.props.fetchUserBookmarkedCollections(user.uid)
  }

  _cancelFetch() {
    this.props.resetUserCollectionsState()
  }

  _updatePref(options) {
    const { user, collection, pref } = options
    this.props.updateUserCollectionPref(
      user.uid,
      collection.id,
      pref,
    )
    this.logEvent(E.event_update_user_collection_pref, {
      userId: user.uid,
      collectionId: collection.id,
      pref
    })
  }

  _viewerRoute() {
    return C.NAV_COLLECTIONS_FLASHCARDS_VIEWER
  }
}

const ns = C.NAV_COLLECTIONS_HOME
function mapStateToProps (state) {
  return {
    user: state.userProfile.data,
    ready: state.collections[ns] ? state.collections[ns].status === C.FB_FETCHED : false,
    collections: state.collections[ns] ? state.collections[ns].data : {},
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch,
    resetUserCollectionsState: () => dispatch(resetUserCollectionsState(ns)),
    fetchUserBookmarkedCollections: (userId) => dispatch(fetchUserBookmarkedCollections(ns, userId)),
    updateUserCollectionPref: (userId, collectionId, prefs) => dispatch(updateUserCollectionPref(userId, collectionId, prefs)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionHome)
