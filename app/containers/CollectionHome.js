import React from 'react'
import { View, ScrollView, StatusBar } from 'react-native'
import { connect } from 'react-redux'

import C, { E } from '../C'
import T from '../T'
import S from '../styles/styles'
import BaseContainer from './BaseContainer'
import CollectionCard from '../components/CollectionCard'
import LoadingIndicator from '../lib/LoadingIndicator'

import {
  fetchUserBookmarkedCollections,
  updateUserCollectionPref,
} from '../actions/UserCollectionsActions'

class CollectionHome extends BaseContainer {
  constructor(props) {
    super(props)
    this.onPrefToggle = this.onPrefToggle.bind(this)
  }

  componentDidMount() {
    const user = this.props.user
    this.setCurrentScreen(E.collection_home)
    this.props.fetchUserBookmarkedCollections(user.uid)
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
    const navigation = this.props.navigation
    const user = this.props.user
    const ready = this.props.ready

    if (!(ready && user)) {
      return (
        <View style={[S.containers.screen, S.containers.centered]}>
          <StatusBar barStyle={S.statusBarStyle} />
          <LoadingIndicator />
        </View>
      )
    }

    const collections = this.props.collections[user.uid] ? this.props.collections[user.uid] : {}
    const collectionsKeys = Object.keys(collections)
    return (
      <ScrollView contentContainerStyle={S.containers.list}>
        <StatusBar barStyle={S.statusBarStyle} />
          { collections &&
            collectionsKeys.map((id, index) => {
              const collection = {id, ...collections[id]}
              const lastItem = (index == (collectionsKeys.length-1)) ? S.lists.lastItem : null
              return (
                <CollectionCard
                  style={[S.lists.listItem, lastItem]}
                  key={collection.id}
                  type={collection.type}
                  // hero={collection.hero}
                  // backgroundColor={collection.backgroundColor}
                  collection={collection}
                  // prefs={collection.prefs}
                  onPrefToggle={this.onPrefToggle}
                  onPress={() => navigation.navigate(C.NAV_FLASHCARDS_VIEWER, {user, event:E.event_collection_type_bookmarked, id:collection.id, title:collection.title, ids:collection.flashcards})}>
                </CollectionCard>
              )
            }
          )}
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
    fetchUserBookmarkedCollections: (userId) => dispatch(fetchUserBookmarkedCollections(userId)),
    updateUserCollectionPref: (userId, collectionId, prefs) => dispatch(updateUserCollectionPref(userId, collectionId, prefs)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionHome)
