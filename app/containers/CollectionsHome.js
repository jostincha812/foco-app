import React from 'react'
import { connect } from 'react-redux'

import C, { R } from '../constants'
import { localize } from '../locales'

import BaseCollectionsListContainer from './BaseCollectionsListContainer'
import CurrentUser from '../auth/CurrentUser'
import { actions as UserPrefsActions } from '../userPrefs'
import { actions as CollectionsActions } from '../collections'

class CollectionsHome extends BaseCollectionsListContainer {
  static navigationOptions = ({navigation}) => {
    return ({
      title: localize("home.title"),
    })
  }

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
    resetUserCollectionsState: () => dispatch(CollectionsActions.resetUserCollectionsState(ns)),
    fetchUserBookmarkedCollections: (userId) => dispatch(CollectionsActions.fetchUserBookmarkedCollections(ns, userId)),
    upsertUserCollectionPrefs: (userId, collectionId, prefs) => dispatch(UserPrefsActions.upsertUserCollectionPrefs(userId, collectionId, prefs)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionsHome)
