import React from 'react'
import { connect } from 'react-redux'

import C, { E } from '../C'
import BaseCollectionsListContainer from './BaseCollectionsListContainer'

import CurrentUser from '../auth/CurrentUser'
import { resetCollectionsState, fetchCollections } from '../actions/collections'
import { upsertUserCollectionPrefs } from '../actions/userPrefs'

class Home extends BaseCollectionsListContainer {
  _fetchData() {
    const user = this.props.user
    this.props.fetchCollections(user.level, user.uid)
  }

  _cancelFetch() {
    this.props.resetCollectionsState()
  }

  _updatePref(options) {
    const { user, collection, pref } = options
    this.props.upsertUserCollectionPrefs(
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
    return C.NAV_HOME_FLASHCARDS_VIEWER
  }
}

const ns = C.NAV_HOME
function mapStateToProps (state) {
  return {
    user: CurrentUser.profile,
    ready: state.collections[ns] ? state.collections[ns].status === C.FB_FETCHED : false,
    collections: state.collections[ns] ? state.collections[ns].data : {},
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch,
    fetchCollections: (ownerId, userId) => dispatch(fetchCollections(ns, ownerId, userId)),
    upsertUserCollectionPrefs: (userId, collectionId, prefs) => dispatch(upsertUserCollectionPrefs(userId, collectionId, prefs)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
