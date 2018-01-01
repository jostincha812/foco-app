import React from 'react'
import { View, ScrollView, StatusBar, RefreshControl } from 'react-native'
import { connect } from 'react-redux'

import C, { E } from '../C'
import S from '../styles/styles'
import BaseContainer from './BaseContainer'
import CollectionCard from '../components/CollectionCard'
import LoadingScreen from '../components/LoadingScreen'
import EmptyListScreen from '../components/EmptyListScreen'

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.ready && !this.props.ready) {
      this.setState({refreshing: false})
    }
  }

  onRefresh() {
    const user = this.props.user
    this.setState({refreshing: true})
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

    const collections = this.props.collections[user.uid] ? this.props.collections[user.uid] : {}
    const collectionsKeys = Object.keys(collections)
    const refreshControl = (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh}
      />
    )

    if (!ready || !user || !this.state.dimensions) {
      return (
        <LoadingScreen onLayout={this.onLayout} />
      )
    }

    if (collectionsKeys.length == 0) {
      return (
        <EmptyListScreen onLayout={this.onLayout} refreshControl={refreshControl} />
      )
    }

    return (
      <ScrollView
        contentContainerStyle={S.containers.list}
        refreshControl={refreshControl}
      >
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
                collection={collection}
                onPrefToggle={this.onPrefToggle}
                onPress={() =>
                  navigation.navigate(C.NAV_COLLECTIONS_FLASHCARDS_VIEWER, {
                    user, collection
                  })
                }
              />
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
