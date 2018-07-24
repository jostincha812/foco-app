import React from 'react'
import { connect } from 'react-redux'

import C, { R } from '../constants'

import FlashcardsListContainer from '../containers/FlashcardsListContainer'
import NavHeaderBackButton from '../components/NavHeaderBackButton'

import CurrentUser from '../auth/CurrentUser'
import { AccessManager } from '../iap'
import { actions as UserPrefsActions } from '../userPrefs'
import { actions as FlashcardActions, FlashcardsList } from '../flashcards'

class BookmarkedHomeFlashcardsViewer extends FlashcardsListContainer {
  static navigationOptions = ({navigation}) => {
    return ({
      title: null,
      headerLeft: <NavHeaderBackButton left={true} onPress={navigation.goBack} />,
    })
  }

  constructor(props) {
    super(props)
    this.setScreen({screenName:R.NAV_COLLECTIONS_FLASHCARDS_VIEWER, className:'CollectionsFlashcardsViewer'})
  }

  componentDidUpdate(prevProps, prevState) {
    super(prevProps, prevState)

    const navigation = this.props.navigation
    if (navigation) {
      const accessType = navigation.state.params.collection.accessType

    }
  }

  get _iapProductType() {
    return C.ACCESS_PREMIUM_COLLECTION
  }

  _fetchData() {
    const navigation = this.props.navigation
    if (!navigation) {
      return null
    }

    const user = this.props.user
    this.setState({refreshing: true })   // , locked: navigation.state.params.locked})
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

const ns = R.NAV_COLLECTIONS_FLASHCARDS_VIEWER
function mapStateToProps (state) {
  return {
    user: CurrentUser.profile,
    ready: state.flashcards[ns] ? state.flashcards[ns].status === C.FB_FETCHED : null,
    flashcards: state.flashcards[ns] ? state.flashcards[ns].data : null,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    resetFlashcardsState: () => dispatch(FlashcardActions.resetFlashcardsState(ns)),
    fetchFlashcards: (ids, userId) => dispatch(FlashcardActions.fetchFlashcards(ns, ids, userId)),
    upsertUserFlashcardPrefs: (userId, flashcardId, prefs) => dispatch(UserPrefsActions.upsertUserFlashcardPrefs(userId, flashcardId, prefs))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookmarkedHomeFlashcardsViewer)
