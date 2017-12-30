import React from 'react'
import { connect } from 'react-redux'
import { fbAnalytics } from '../../configureFirebase'

import { RefreshControl } from 'react-native'

import C, { E } from '../C'
import S from '../styles/styles'
import BaseContainer from './BaseContainer'
import FlashcardsList from '../components/FlashcardsList'
import LoadingScreen from '../components/LoadingScreen'
import EmptyListScreen from '../components/EmptyListScreen'

import {
  fetchStarredFlashcards,
  resetFlashcardsState,
  updateUserFlashcardPref
} from '../actions/FlashcardActions'

class StarredHome extends BaseContainer {
  constructor(props) {
    super(props)
    this.onPrefToggle = this.onPrefToggle.bind(this)
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', this._fetchData)
    this.props.navigation.addListener('blur', this._cancelFetch)
    // this.setCurrentScreen(E.flashcards_set_viewer, { id, title })
    // this.logEvent(E.event_view_set, { id, title, type })
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus', this._fetchData);
    this.props.navigation.removeListener('blur', this._cancelFetch);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ready && !this.props.ready) {
      this.setState({refreshing: false})
    }
  }

  _fetchData() {
    console.log("_fetchData()")
    const user = this.props.user
    this.setState({refreshing: true})
    this.props.resetFlashcardsState()
    this.props.fetchStarredFlashcards(user.uid)
  }

  _cancelFetch() {
    console.log("_cancelFetch()")
    this.props.resetFlashcardsState()
    this.setState({refreshing: false})
  }

  onRefresh() {
    this._fetchData()
    // const user = this.props.user
    // this.setState({refreshing: true})
    // this.props.fetchStarredFlashcards(user.uid)
  }

  onPrefToggle(id, toggle) {
    const user = this.props.user
    const flashcard = this.props.flashcards[id]
    const pref = {
      key: Object.keys(toggle)[0],
      val: Object.values(toggle)[0]
    }

    this.props.updateUserFlashcardPref(
      user.uid,
      flashcard.id,
      pref,
    )
    this.logEvent(E.event_update_flashcard_pref, {
      userId: user.uid,
      flashcardId: flashcard.id,
      pref
    })
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

function mapStateToProps (state) {
  return {
    user: state.userProfile.data,
    ready: state.flashcards.status === C.FB_FETCHED,
    flashcards: state.flashcards.data,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    resetFlashcardsState: () => dispatch(resetFlashcardsState()),
    fetchStarredFlashcards: (userId) => dispatch(fetchStarredFlashcards(userId)),
    updateUserFlashcardPref: (userId, flashcardId, prefs) => dispatch(updateUserFlashcardPref(userId, flashcardId, prefs))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StarredHome)
