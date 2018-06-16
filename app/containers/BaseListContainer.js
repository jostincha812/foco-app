import React from 'react'
import { Dimensions, StatusBar, Text, View, ScrollView, RefreshControl } from 'react-native'
import { Animated, LayoutAnimation } from 'react-native'

import { E } from '../constants'
import S from '../styles'
import BaseContainer from './BaseContainer'
import LoadingScreen from '../components/LoadingScreen'
import EmptyListScreen from '../components/EmptyListScreen'
import BackToTopButton from '../components/BackToTopButton'

export default class BaseListContainer extends BaseContainer {
  constructor(props) {
    super(props)
    this.state = { ...this.state, showBackToTop: false, reachedEnd: false, stickyTitle: false, stickied: false}
    this.setTitle = this.setTitle.bind(this)
    this.onTitleLayout = this.onTitleLayout.bind(this)
    this.onScroll = this.onScroll.bind(this)
    this.onScrollToTopPress = this.onScrollToTopPress.bind(this)
  }

  get _scrollEvent() {
    // to be overridden by subclasses
    return E.user_action_list_scrolled
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
      this.logEvent(this._scrollEvent, {
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
      this.logEvent(this._scrollEvent, {
        uid: user.uid,
        location: 'end',
        ...this._screen,
      })
    } else if (this.state.reachedEnd && !scrolledToEnd) {
      this.setState({ reachedEnd: false })
    }

    // LayoutAnimation.Presets.linear == 500ms duration
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
    this.logEvent(this._scrollEvent, {
      uid: user.uid,
      location: 'start',
      ...this._screen,
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
          refreshControl={refreshControl}
          onScroll={this.onScroll}
          scrollEventThrottle={64}
          stickyHeaderIndices={this.state.stickyTitle ? [1] : []}
          ref='_SCROLLVIEW'
        >
          <StatusBar barStyle={S.statusBarStyle} />

          { this._renderIapModal(props)}

          { this._title && headerView }

          { this._renderList(props) }
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
