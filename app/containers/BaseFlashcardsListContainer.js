import React from 'react'
import { RefreshControl } from 'react-native'

import BaseContainer from './BaseContainer'
import FlashcardsList from '../components/FlashcardsList'
import LoadingScreen from '../components/LoadingScreen'
import EmptyListScreen from '../components/EmptyListScreen'

export default class StarredHome extends BaseContainer {
  constructor(props) {
    super(props)
    this.onPrefToggle = this.onPrefToggle.bind(this)
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

  onPrefToggle(id, toggle) {
    const user = this.props.user
    const flashcard = this.props.flashcards[id]
    const pref = {
      key: Object.keys(toggle)[0],
      val: Object.values(toggle)[0]
    }
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

  render() {
    const props = this.props
    const ready = props.ready
    const flashcards = props.flashcards
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
      <FlashcardsList
        dimensions={this.state.dimensions}
        flashcards={flashcards}
        onPrefToggle={this.onPrefToggle}
        refreshControl={refreshControl}
      />
    )
  }
}
