import React from 'react'
import { connect } from 'react-redux'

import C, { E } from '../C'
import BaseFlashcardsListContainer from './BaseFlashcardsListContainer'
import FlashcardsList from '../components/FlashcardsList'
import LoadingScreen from '../components/LoadingScreen'
import EmptyListScreen from '../components/EmptyListScreen'

import { fetchStarredFlashcards, resetFlashcardsState } from '../actions/FlashcardActions'
import { updateUserFlashcardPref } from '../actions/UserPrefsActions'

class StarredHome extends BaseFlashcardsListContainer {
  _fetchData() {
    const user = this.props.user
    this.setState({refreshing: true})
    this.props.fetchStarredFlashcards(user.uid)
  }

  _cancelFetch() {
    this.props.resetFlashcardsState()
    this.setState({refreshing: false})
  }

  _updatePref(options) {
    const { user, flashcard, pref } = options
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
}

const ns = C.NAV_STARRED_TAB
function mapStateToProps (state) {
  return {
    user: state.userProfile.data,
    ready: state.flashcards[ns] ? state.flashcards[ns].status === C.FB_FETCHED : null,
    flashcards: state.flashcards[ns] ? state.flashcards[ns].data : null,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    resetFlashcardsState: () => dispatch(resetFlashcardsState(ns)),
    fetchStarredFlashcards: (userId) => dispatch(fetchStarredFlashcards(ns, userId)),
    updateUserFlashcardPref: (userId, flashcardId, prefs) => dispatch(updateUserFlashcardPref(userId, flashcardId, prefs))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StarredHome)
