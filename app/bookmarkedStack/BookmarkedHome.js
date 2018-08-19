import React from 'react'
import { connect } from 'react-redux'

import C, { R } from '../constants'
import { localize } from '../locales'

import CollectionsListContainer from '../containers/CollectionsListContainer'
import CurrentUser from '../auth/CurrentUser'
import { actions as UserPrefsActions } from '../userPrefs'
import { actions as CollectionsActions } from '../collections'

class BookmarkedHome extends CollectionsListContainer {
  static navigationOptions = ({navigation}) => {
    return ({
      title: null,
      header: null,
    })
  }

  constructor(props) {
    super(props)
    this.setTitle(localize("bookmarked.title"))
    this.setScreen({screenName:R.NAV_BOOKMARKED_HOME, className:'BookmarkedHome'})
  }

  get user() {
    return CurrentUser
  }

  get _onSelectedRoute() {
    return R.NAV_BOOKMARKED_FLASHCARDS_VIEWER
  }

  _fetchData() {
    const profile = this.props.profile
    if (profile) {
      this.props.fetchUserBookmarkedCollections(profile.uid)
    }
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

  showReviewerIap() {
    this.props.navigation.navigate(R.NAV_RECOMMENDED_GO_PREMIUM)
  }
}

const ns = R.NAV_BOOKMARKED_HOME
function mapStateToProps (state) {
  return {
    profile: CurrentUser.profile,
    ready: state.collections[ns] ? state.collections[ns].status === C.FB_FETCHED : false,
    collections: state.collections[ns] ? state.collections[ns].data : {},
    isEmpty: state.collections[ns] && state.collections[ns].data && (Object.keys(state.collections[ns].data).length == 0)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    resetCollectionsState: () => dispatch(CollectionsActions.resetCollectionsState(ns)),
    fetchUserBookmarkedCollections: (userId) => dispatch(CollectionsActions.fetchUserBookmarkedCollections(ns, userId)),
    upsertUserCollectionPrefs: (userId, collectionId, prefs) => dispatch(UserPrefsActions.upsertUserCollectionPrefs(userId, collectionId, prefs)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookmarkedHome)
