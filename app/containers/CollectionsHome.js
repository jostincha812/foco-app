import React from 'react'
import { connect } from 'react-redux'

import C from '../constants'
import { R } from '../constants'

import BaseCollectionsListContainer from './BaseCollectionsListContainer'
import CurrentUser from '../auth/CurrentUser'
import { resetCollectionsState, fetchUserBookmarkedCollections } from '../actions/collections'
import { upsertUserCollectionPrefs } from '../actions/userPrefs'

class CollectionsHome extends BaseCollectionsListContainer {
  constructor(props) {
    super(props)
    this.setScreen({screenName:R.NAV_COLLECTIONS_HOME, className:'CollectionsHome'})
  }

  _fetchData() {
    const user = this.props.user
    this.props.fetchUserBookmarkedCollections(user.uid)
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
  }

  _viewerRoute() {
    return R.NAV_COLLECTIONS_FLASHCARDS_VIEWER
  }
}

const ns = R.NAV_COLLECTIONS_HOME
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
    resetUserCollectionsState: () => dispatch(resetUserCollectionsState(ns)),
    fetchUserBookmarkedCollections: (userId) => dispatch(fetchUserBookmarkedCollections(ns, userId)),
    upsertUserCollectionPrefs: (userId, collectionId, prefs) => dispatch(upsertUserCollectionPrefs(userId, collectionId, prefs)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionsHome)
