import React from 'react'
import { ScrollView, RefreshControl } from 'react-native'

import C, { E } from '../C'
import S from '../styles/styles'
import BaseContainer from './BaseContainer'
import CollectionCard from '../components/CollectionCard'
import LoadingScreen from '../components/LoadingScreen'
import EmptyListScreen from '../components/EmptyListScreen'

export default class CollectionHome extends BaseContainer {
  constructor(props) {
    super(props)
    this.onPrefToggle = this.onPrefToggle.bind(this)
    this.onCollectionPress = this.onCollectionPress.bind(this)
  }

  componentDidMount() {
    this._fetchData()
  }

  componentWillUnmount() {
    this._cancelFetch()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ready && !this.props.ready) {
      this.setState({refreshing: false})
    }
  }

  onRefresh() {
    this._fetchData()
  }

  onPrefToggle(collectionId, pref) {
    const user = this.props.user
    const collection = {id:collectionId, ...this.props.collections[collectionId]}
    this._updatePref({user, collection, pref})
  }

  onCollectionPress(collection) {
    const navigation = this.props.navigation
    const user = this.props.user
    navigation.navigate(this._viewerRoute(), {
      user, collection
    })
  }

  _fetchData() {
    // no-op - to be overridden by subclass
  }

  _cancelFetch() {
    // no-op - to be overridden by subclass
  }

  _updatePref(options) {
    // no-op - to be overridden by subclass
  }

  _viewerRoute() {
    // no-op - to be overridden by subclass
  }

  render() {
    const navigation = this.props.navigation
    const user = this.props.user
    const ready = this.props.ready

    const collections = this.props.collections ? this.props.collections : {}
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
                onPress={() => this.onCollectionPress(collection)}>
              </CollectionCard>
            )
          }
        )}
      </ScrollView>
    )
  }
}
