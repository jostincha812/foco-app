import React from 'react'
import { ScrollView, StatusBar } from 'react-native'
import { connect } from 'react-redux'

import C from '../C'
import T from '../T'
import S from '../styles/styles'
import BaseContainer from './BaseContainer'
import CollectionCard from '../components/CollectionCard'
import LoadingIndicator from '../lib/LoadingIndicator'
// import Icons from '../components/Icons'
// import Card from '../lib/Card';

import {
  fetchUserCollections,
  updateUserCollectionPref,
} from '../actions/UserCollectionsActions'

class CollectionHome extends BaseContainer {
  static navigationOptions = ({navigation}) => ({
    title: 'My Collection',
  })

  constructor(props) {
    super(props)
    this.onPrefToggle = this.onPrefToggle.bind(this)
  }

  componentDidMount() {
    const user = this.props.user
    this.setCurrentScreen(E.collection_home)
    this.props.fetchUserCollections(user.level, user.uid)
  }

  onPrefToggle(id, toggle) {
    const user = this.props.user
    const collection = this.props.collections[id]
    const pref = {
      key: Object.keys(toggle)[0],
      val: Object.values(toggle)[0]
    }

    this.props.updateUserCollectionPref(
      user.uid,
      id,
      pref,
    )
    this.logEvent(E.event_update_user_collection_pref, {
      userId: user.uid,
      collectionId: id,
      pref
    })
  }

  render() {
    const navigation = this.props.navigation;

    return (
      <ScrollView contentContainerStyle={S.containers.list}>
        <StatusBar barStyle={S.statusBarStyle} />

      </ScrollView>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.userProfile.data,
    ready: state.collections.status === C.FB_FETCHED,
    updated: state.collections.status === C.FB_UPDATED,
    deleted: state.collections.status === C.FB_REMOVED,
    collections: state.collections.data,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch,
    fetchUserCollections: (ownerId, userId) => dispatch(fetchUserCollections(ownerId, userId)),
    updateUserCollectionPref: (userId, collectionId, prefs) => dispatch(updateUserCollectionPref(userId, collectionId, prefs)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionHome)
