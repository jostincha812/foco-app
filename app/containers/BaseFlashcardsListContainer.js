import React from 'react'
import { View, StatusBar, RefreshControl } from 'react-native'

import S from '../styles/styles'
import BaseContainer from './BaseContainer'
import FlashcardsList from '../components/FlashcardsList'
import LoadingScreen from '../components/LoadingScreen'
import EmptyListScreen from '../components/EmptyListScreen'
import BackToTopButton from '../components/BackToTopButton'

export default class BaseFlashcardsListContainer extends BaseContainer {
  constructor(props) {
    super(props)
    this.state = { ...this.state, showBackToTop: false }
    this.onPrefToggle = this.onPrefToggle.bind(this)
    this.onScroll = this.onScroll.bind(this)
    this.onScrollToTopPress = this.onScrollToTopPress.bind(this)
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

  onScroll(e) {
    const yOffset = e.nativeEvent.contentOffset.y
    const passThreshold = yOffset > (this.state.dimensions.height * 1.5)
    if (!this.state.showBackToTop && passThreshold) {
      this.setState({ showBackToTop: true })
    }

    if (this.state.showBackToTop && !passThreshold) {
      this.setState({ showBackToTop: false })
    }
  }

  onScrollToTopPress() {
    this.refs['_SCROLLVIEW'].scrollTo({x: 0, y: 0, animated: true})
  }

  onPrefToggle(id, pref) {
    const user = this.props.user
    const flashcard = this.props.flashcards[id]
    this._updatePref({user, flashcard, pref})
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

  _flashcards() {
    // to be overridden by subclass
    return this.props.flashcards
  }

  render() {
    const props = this.props
    const ready = props.ready
    const flashcards = this._flashcards()
    const refreshControl = (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh}
      />
    )

    if (!ready || !this.state.dimensions) {
      return (
        <LoadingScreen onLayout={this.onLayout} />
      )
    }

    if (!flashcards) {
      return (
        <EmptyListScreen onLayout={this.onLayout} refreshControl={refreshControl} />
      )
    }

    return (
      <View style={{flex:1}}>
        <StatusBar barStyle={S.statusBarStyle} />
        <FlashcardsList
          dimensions={this.state.dimensions}
          flashcards={flashcards}
          onPrefToggle={this.onPrefToggle}
          refreshControl={refreshControl}
          onScroll={this.onScroll}
          scrollEventThrottle={64}
          ref='_SCROLLVIEW'
        />

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
