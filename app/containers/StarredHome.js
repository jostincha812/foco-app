import React from 'react'
import { connect } from 'react-redux'
import { Map } from 'immutable'

import C, { E, R } from '../constants'
import { localize } from '../locales'

import BaseFlashcardsListContainer from './BaseFlashcardsListContainer'
import LoadingScreen from '../components/LoadingScreen'
import EmptyListScreen from '../components/EmptyListScreen'
import NavHeaderFilterToggleButton from '../components/NavHeaderFilterToggleButton'

import CurrentUser from '../auth/CurrentUser'
import { actions as UserPrefsActions } from '../userPrefs'
import { actions as FlashcardActions, FlashcardsList } from '../flashcards'

class StarredHome extends BaseFlashcardsListContainer {
  static navigationOptions = ({navigation}) => {
    if (navigation.state.params) {
      return ({
        title: localize("starred.title"),
        headerRight: (
          <NavHeaderFilterToggleButton
            toggled={navigation.state.params.filtered}
            right={true}
            onPress={() => navigation.navigate(R.NAV_STARRED_FILTER_CONFIGURATOR, {
              onFilter: navigation.state.params.onFilter,
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
    this.onFilter = this.onFilter.bind(this)
    this.setScreen({screenName:R.NAV_STARRED_HOME, className:'StarredHome'})
  }

  componentDidMount() {
    super.componentDidMount()
    this.props.navigation.setParams({
      filtered: this.state.filtered,
      filters: this.state.filters,
      onDone: this.onDone,
      onFilter: this.onFilter,
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

    let passed = false
    const filters = this.state.filters
    const tags = flashcard.tags || []
    tags.map(tag => {
      if (filters[tag]) {
        passed = true
        return
      }
    })

    return passed
  }

  onFilter(filters) {
    let filtered = false
    if (filters) {
      Object.keys(filters).map(key => {
        if (filters[key]) {
          filtered = true
        }
      })
    }

    // to update nav header
    this.props.navigation.setParams({filtered, filters})
    // to update list
    this.setState({filtered, filters})
  }
}

const ns = R.NAV_STARRED_HOME
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
    fetchUserStarredFlashcards: (userId) => dispatch(FlashcardActions.fetchUserStarredFlashcards(ns, userId)),
    upsertUserFlashcardPrefs: (userId, flashcardId, prefs) => dispatch(UserPrefsActions.upsertUserFlashcardPrefs(userId, flashcardId, prefs))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StarredHome)
