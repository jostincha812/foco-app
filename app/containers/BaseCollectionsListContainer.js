import React from 'react'
import { Dimensions, StatusBar, Text, View, ScrollView, RefreshControl } from 'react-native'
import { Animated, LayoutAnimation } from 'react-native'

import C, { E } from '../constants'
import S from '../styles'
import BaseContainer from './BaseContainer'
import LoadingScreen from '../components/LoadingScreen'
import EmptyListScreen from '../components/EmptyListScreen'
import BackToTopButton from '../components/BackToTopButton'
import StyledText from '../lib/StyledText'
import {ProUpgradeModal as IapModal} from '../iap'

import { CollectionCard } from '../collections'

export default class BaseCollectionsListContainer extends BaseContainer {
  constructor(props) {
    super(props)
    this.state = { ...this.state, showBackToTop: false, reachedEnd: false, stickyTitle: false, stickied: false }
    this.setTitle = this.setTitle.bind(this)
    this.onTitleLayout = this.onTitleLayout.bind(this)
    this.onScroll = this.onScroll.bind(this)
    this.onScrollToTopPress = this.onScrollToTopPress.bind(this)
    this.onCollectionPress = this.onCollectionPress.bind(this)
    this.onPrefToggle = this.onPrefToggle.bind(this)
    this.showIapModal = this.showIapModal.bind(this)
    this.hideIapModal = this.hideIapModal.bind(this)

    this.state.iapVisible = false
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

  setTitle(title) {
    this._title = title
    if (title) {
      this.setState({stickyTitle:true})
    }
  }

  onTitleLayout(e) {
    if (!this._titleHeight) {
      const y = e.nativeEvent.layout.y
      const h = e.nativeEvent.layout.height
      this._titleLoc = y
    }
  }

  onScroll(e) {
    const yOffset = e.nativeEvent.contentOffset.y
    const passThreshold = yOffset > (this.state.dimensions.height * 1.5)
    if (!this.state.showBackToTop && passThreshold) {
      this.setState({ showBackToTop: true })
      this.logEvent(E.user_action_collections_scrolled, {
        uid: this.props.user.uid,
        ...this._screen,
      })
    }

    if (this.state.showBackToTop && !passThreshold) {
      this.setState({ showBackToTop: false })
    }

    const user = this.props.user
    const windowHeight = Dimensions.get('window').height
    const scrolledToEnd = (windowHeight + yOffset) >= e.nativeEvent.contentSize.height
    if (!this.state.reachedEnd && scrolledToEnd) {
      this.setState({ reachedEnd: true })
      this.logEvent(E.user_action_collections_scrolled, {
        uid: user.uid,
        location: 'end',
        ...this._screen,
      })
    } else if (this.state.reachedEnd && !scrolledToEnd) {
      this.setState({ reachedEnd: false })
    }

    // LyaoutAnimation.Presets.linear == 500ms duration
    // Linear with easing
    const CustomLayoutLinear = {
      duration: 200,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    }

    if (!this.state.stickied && yOffset > this._titleLoc) {
      LayoutAnimation.configureNext(CustomLayoutLinear)
      this.setState({stickied: true})
    } else if (this.state.stickied && yOffset < this._titleLoc - 1) {
      LayoutAnimation.configureNext(CustomLayoutLinear)
      this.setState({stickied: false})
    }
  }

  onScrollToTopPress() {
    const user = this.props.user
    this.refs['_SCROLLVIEW'].scrollTo({x: 0, y: 0, animated: true})
    this.logEvent(E.user_action_collections_scrolled, {
      uid: user.uid,
      location: 'start',
      ...this._screen,
    })
  }

  onCollectionPress(collection) {
    const navigation = this.props.navigation
    const user = this.props.user

    if (collection.status == C.STATUS_COMING_SOON) {
      this.logEvent(E.user_action_collection_coming_soon, {
        uid: user.uid,
        collectionId: collection.id,
        ...this._screen,
      })
    } else {
      this.logEvent(E.user_action_collection_selected, {
        uid: user.uid,
        collectionId: collection.id,
        ...this._screen,
      })
      navigation.navigate(this._viewerRoute(), {
        user, collection
      })
    }
  }

  onPrefToggle(collectionId, pref) {
    const user = this.props.user
    const collection = {id:collectionId, ...this.props.collections[collectionId]}
    this._updatePref({user, collection, pref})
    this.logEvent(E.user_action_collection_pref_updated, {
      uid: user.uid,
      collectionId: collection.id,
      pref,
      ...this._screen,
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

  showIapModal() {
    this.setState({iapVisible: true})
  }

  hideIapModal() {
    this.setState({iapVisible: false})
  }

  render() {
    const navigation = this.props.navigation
    const user = this.props.user
    const ready = this.props.ready
    const iapVisible = this.state.iapVisible

    const collections = this.props.collections ? this.props.collections : {}
    const collectionsKeys = Object.keys(collections).sort().reverse()
    const refreshControl = (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh}
      />
    )

    const headerView = (
      <Animated.View
        onLayout={this.onTitleLayout}
        style={[S.containers.header, this.state.stickied ? S.navigation.stickiedHeader : S.navigation.floatingHeader]}
      >
        <View style={{flex:1, justifyContent:'flex-end'}}>
          <Text style={this.state.stickied ? S.navigation.stickiedHeaderTextStyle : S.navigation.floatingHeaderTextStyle}>
            {this._title}
          </Text>
        </View>
      </Animated.View>
    )

    if (!ready || !user || !this.state.dimensions) {
      return (
        <LoadingScreen onLayout={this.onLayout} />
      )
    }

    if (collectionsKeys.length == 0) {
      return (
        <EmptyListScreen
          contentContainerStyle={S.containers.list}
          onLayout={this.onLayout}
          refreshControl={refreshControl}
        >
          { this._title && headerView }
        </EmptyListScreen>
      )
    }

    return (
      <View style={S.containers.screen}>
        <ScrollView
          contentContainerStyle={S.containers.list}
          refreshControl={refreshControl}
          onScroll={this.onScroll}
          scrollEventThrottle={64}
          stickyHeaderIndices={this.state.stickyTitle ? [1] : []}
          ref='_SCROLLVIEW'
        >
          <StatusBar barStyle={S.statusBarStyle} />
          <IapModal isVisible={iapVisible} 
            dismissModal={this.hideIapModal}
            successToast={this.successToast}
            errorToast={this.errorToast} />

          { this._title && headerView }

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
                  onPress={() => this.onCollectionPress(collection)}
                  showIap={this.showIapModal}>
                </CollectionCard>
              )
            }
          )}
        </ScrollView>

        { this.state.showBackToTop && (
          <BackToTopButton
            style={S.lists.backToTop}
            onPress={this.onScrollToTopPress}
          />
        )}
      </View>
    )
  }
}
