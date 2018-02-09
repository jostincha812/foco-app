import React from 'react'
import { connect } from 'react-redux'

import T from '../T'
import C, { R } from '../constants'
import { localize } from '../locales'
import BaseCollectionsListContainer from './BaseCollectionsListContainer'

import CurrentUser from '../auth/CurrentUser'
import { actions as UserPrefsActions } from '../userPrefs'
import { actions as CollectionsActions } from '../collections'

class Home extends BaseCollectionsListContainer {
  static navigationOptions = ({navigation}) => {
    return ({
      title: localize("home.title"),
      header: null,
    })
  }

  constructor(props) {
    super(props)
    this.setScreen({screenName:R.NAV_HOME, className:'Home'})
  }

  componentWillMount() {
    this.setTitle(localize("home.title"))
  }

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
  }

  _viewerRoute() {
    return R.NAV_HOME_FLASHCARDS_VIEWER
  }
}

const ns = R.NAV_HOME
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
    fetchCollections: (ownerId, userId) => dispatch(CollectionsActions.fetchCollections(ns, ownerId, userId)),
    upsertUserCollectionPrefs: (userId, collectionId, prefs) => dispatch(UserPrefsActions.upsertUserCollectionPrefs(userId, collectionId, prefs)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
