import React from 'react'
import { Dimensions, StatusBar, Text, View, ScrollView, RefreshControl } from 'react-native'
import { Animated, LayoutAnimation } from 'react-native'
import { Platform } from 'react-native'

import T from '../T'
import Notification from 'react-native-in-app-notification'

import { E } from '../constants'
import S from '../styles'
import BaseContainer from './BaseContainer'
import LoadingScreen from '../components/LoadingScreen'
import EmptyListScreen from '../components/EmptyListScreen'
import BackToTopButton from '../components/BackToTopButton'
import StickiableFloatingListHeader from '../components/StickiableFloatingListHeader'

export default class BaseListContainer extends BaseContainer {
  constructor(props) {
    super(props)
    this.state = { ...this.state, showBackToTop: false, reachedEnd: false, stickyTitle: false, stickied: false}
    this.setTitle = this.setTitle.bind(this)
    this.onTitleLayout = this.onTitleLayout.bind(this)
    this.onScroll = this.onScroll.bind(this)
    this.onScrollToTopPress = this.onScrollToTopPress.bind(this)
  }

  get _paging() {
    // to be overridden by subclasses
    return false
  }

  get _scrollEventName() {
    // to be overridden by subclasses
    return E.user_action_list_scrolled
  }

  componentDidMount() {
    this._fetchData()
  }

  componentWillUnmount() {
    this._cancelFetch()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.ready && !prevProps.ready) {
      this.setState({refreshing: false})
    }
  }

  onRefresh() {
    this._fetchData()
  }

  setTitle(title) {
    this._title = title
    if (title) {
      this.state.stickyTitle = true
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
      this.logEvent(this._scrollEventName, {
        location: 'middle'
      })
    }

    if (this.state.showBackToTop && !passThreshold) {
      this.setState({ showBackToTop: false })
    }

    const windowHeight = Dimensions.get('window').height
    const scrolledToEnd = (windowHeight + yOffset) >= e.nativeEvent.contentSize.height
    if (!this.state.reachedEnd && scrolledToEnd) {
      this.setState({ reachedEnd: true })
      this.logEvent(this._scrollEventName, {
        location: 'end',
      })
    } else if (this.state.reachedEnd && !scrolledToEnd) {
      this.setState({ reachedEnd: false })
    }

    if (!this.state.stickied && yOffset > this._titleLoc + 10) {
      this.setState({stickied: true})
    } else if (this.state.stickied && yOffset < this._titleLoc + 10) {
      this.setState({stickied: false})
    }
  }

  onScrollToTopPress() {
    this.refs['_SCROLLVIEW'].scrollTo({x: 0, y: 0, animated: true})
    this.logEvent(this._scrollEventName, {
      location: 'start',
    })
  }

  _fetchData() {
    // no-op - to be overridden by subclass
  }

  _cancelFetch() {
    // no-op - to be overridden by subclass
  }

  _renderIapModal(props) {
    // no-op - to be overridden by subclass
  }

  _renderList(props) {
    // no-op - to be overridden by subclass
  }

  render() {
    const props = this.props
    const navigation = this.props.navigation
    const ready = this.props.ready

    const refreshControl = (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh}
      />
    )

    const headerView = (
      <StickiableFloatingListHeader
        onLayout={this.onTitleLayout}
        isStickied={this.state.stickied}
        headerText={this._title}
      />
    )

    if (!ready || !this.state.dimensions) {
      return (
        <LoadingScreen onLayout={this.onLayout} />
      )
    }

    if (props.isEmpty) {
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
          pagingEnabled={this._paging}
          refreshControl={refreshControl}
          onScroll={this.onScroll}
          scrollEventThrottle={64}
          stickyHeaderIndices={this.state.stickyTitle ? [1] : []}
          ref='_SCROLLVIEW'
        >
          <StatusBar barStyle={S.statusBarStyle} />

          { this._title && headerView }

          { this._renderIapModal(props)}

          { this._renderList(props) }
        </ScrollView>

        { this.state.showBackToTop && (
          <BackToTopButton
            style={S.lists.backToTop}
            onPress={this.onScrollToTopPress}
          />
        )}

        <Notification ref={(ref) => { this.notification = ref; }}
          height={60}
          backgroundColour={this.state.notificationColor}
        />
      </View>
    )
  }
}
