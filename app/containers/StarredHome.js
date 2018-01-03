import React from 'react'
import { connect } from 'react-redux'

import C, { E } from '../C'
import BaseFlashcardsListContainer from './BaseFlashcardsListContainer'
import FlashcardsList from '../components/FlashcardsList'
import LoadingScreen from '../components/LoadingScreen'
import EmptyListScreen from '../components/EmptyListScreen'
import NavHeaderFilterToggleButton from '../components/NavHeaderFilterToggleButton'

import { resetFlashcardsState, fetchUserStarredFlashcards } from '../actions/flashcards'
import { upsertUserFlashcardPrefs } from '../actions/userPrefs'

class StarredHome extends BaseFlashcardsListContainer {
  static navigationOptions = ({navigation}) => {
    if (navigation.state.params) {
      return ({
        title: null,
        headerRight: (
          <NavHeaderFilterToggleButton
            toggled={navigation.state.params.filtered}
            right={true}
            onPress={() => navigation.navigate(C.NAV_STARRED_FILTER_CONFIGURATOR, {
              onDone: navigation.state.params.onDone,
              filters: navigation.state.params.filters,
            })}
          />
        )
      })
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      filtered: false,
      filters: {},
    }
    this.state.filters[C.TAG_TYPE_CATEGORIES] = {}
    this.state.filters[C.TAG_TYPE_REGIONS] = {}
    this.state.filters[C.TAG_TYPE_VARIETALS] = {}
    this.onDone = this.onDone.bind(this)
  }

  componentDidMount() {
    super.componentDidMount()
    this.props.navigation.setParams({
      filtered: this.state.filtered,
      filters: this.state.filters,
      onDone: this.onDone
    })
  }

  _fetchData() {
    const user = this.props.user
    this.setState({refreshing: true})
    this.props.fetchUserStarredFlashcards(user.uid)
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
    this.logEvent(E.event_update_flashcard_pref, {
      userId: user.uid,
      flashcardId: flashcard.id,
      pref
    })
  }

  _flashcards() {
    if (this.props.flashcards == null) {
      return null
    }

    const flashcards = {}
    Object.keys(this.props.flashcards).map(key => {
      if (this.passedFilters(this.props.flashcards[key])) {
        flashcards[key] = { ...this.props.flashcards[key] }
      }
    })
    return (flashcards)
  }

  passedFilters(flashcard) {
    if (!this.state.filtered) {
      return true
    }

    const filters = this.state.filters
    const tags = flashcard.tags || []
    tags.map(tag => {
      if (filters[C.TAG_TYPE_CATEGORIES][tag]) {
        return true
      }
      if (filters[C.TAG_TYPE_REGIONS][tag]) {
        return true
      }
      if (filters[C.TAG_TYPE_VARIETALS][tag]) {
        return true
      }
    })
  }

  onDone(filters) {
    let filtered = false
    if (filters) {
      Object.keys(filters).map(filterType => {
        Object.keys(filters[filterType]).map(key => {
          if (filters[filterType][key]) {
            filtered = true
          }
        })
      })
    }

    // to update nav header
    this.props.navigation.setParams({
      filtered,
      filters
    })
    // to update list
    this.setState({filtered, filters})
  }
}

const ns = C.NAV_STARRED_HOME
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
    fetchUserStarredFlashcards: (userId) => dispatch(fetchUserStarredFlashcards(ns, userId)),
    upsertUserFlashcardPrefs: (userId, flashcardId, prefs) => dispatch(upsertUserFlashcardPrefs(userId, flashcardId, prefs))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StarredHome)
