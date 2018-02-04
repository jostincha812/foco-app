import React from 'react'
import { connect } from 'react-redux'

import C, { R } from '../constants'

import BaseFlashcardsListContainer from './BaseFlashcardsListContainer'
import NavHeaderBackButton from '../components/NavHeaderBackButton'
import LoadingScreen from '../components/LoadingScreen'
import EmptyListScreen from '../components/EmptyListScreen'

import CurrentUser from '../auth/CurrentUser'
import { upsertUserFlashcardPrefs } from '../actions/userPrefs'

import flashcards from '../flashcards'
const { actions, FlashcardsList } = flashcards
// import { resetFlashcardsState, fetchFlashcards } from '../actions/flashcards'

class HomeFlashcardsViewer extends BaseFlashcardsListContainer {
  static navigationOptions = ({navigation}) => {
    return ({
      title: null,
      headerLeft: (
        <NavHeaderBackButton left={true} onPress={navigation.goBack} />
      )
    })
  }

  constructor(props) {
    super(props)
    this.setScreen({screenName:R.NAV_HOME_FLASHCARDS_VIEWER, className:'HomeFlashcardsViewer'})
  }

  _fetchData() {
    const navigation = this.props.navigation
    if (!navigation) {
      return null
    }

    const user = this.props.user
    this.setState({refreshing: true})
    this.props.fetchFlashcards(navigation.state.params.collection.flashcards, user.uid)
  }

  _cancelFetch() {
    this.props.resetFlashcardsState()
    this.setState({refreshing: false})
  }

  _updatePref(options) {
    const { user, flashcard, pref } = options
    this.props.upsertUserFlashcardPrefs(
      user.uid,
      flashcard.id,
      pref,
    )
  }
}

const ns = R.NAV_HOME_FLASHCARDS_VIEWER
function mapStateToProps (state) {
  return {
    user: CurrentUser.profile,
    ready: state.flashcards[ns] ? state.flashcards[ns].status === C.FB_FETCHED : null,
    flashcards: state.flashcards[ns] ? state.flashcards[ns].data : null,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    resetFlashcardsState: () => dispatch(actions.resetFlashcardsState(ns)),
    fetchFlashcards: (ids, userId) => dispatch(actions.fetchFlashcards(ns, ids, userId)),
    upsertUserFlashcardPrefs: (userId, flashcardId, prefs) => dispatch(upsertUserFlashcardPrefs(userId, flashcardId, prefs))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeFlashcardsViewer)
