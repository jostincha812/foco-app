import React from 'react'
import { Platform } from 'react-native'
import { connect } from 'react-redux'
import { Map } from 'immutable'

import C, { E, R } from '../constants'
import S from '../styles'
import { localize } from '../locales'

import FlashcardsListContainer from '../containers/FlashcardsListContainer'
import NavHeaderFilterToggleButton from '../components/NavHeaderFilterToggleButton'

import CurrentUser from '../auth/CurrentUser'
import { actions as UserPrefsActions } from '../userPrefs'
import { actions as FlashcardActions, FlashcardsList } from '../flashcards'

class StarredHome extends FlashcardsListContainer {
  static navigationOptions = ({navigation}) => {
    if (navigation.state.params) {
      return ({
        title: localize("starred.title"),
        headerStyle: {
          paddingLeft: Platform.OS === 'ios' ? 0 : S.spacing.small,
        },
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

  get user() {
    return CurrentUser
  }

  _fetchData() {
    const profile = this.props.profile
    this.setState({refreshing: true})
    this.props.fetchUserStarredFlashcards(profile.uid)
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

  get _filteredFlashcards() {
    if (this.props.flashcards == null) {
      return null
    }

    const flashcards = {}
    Object.keys(this.props.flashcards).map(key => {
      if (this._passedFilters(this.props.flashcards[key])) {
        flashcards[key] = { ...this.props.flashcards[key] }
      }
    })
    return (flashcards)
  }

  _passedFilters(flashcard) {
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
  let isEmpty = true
  if (state.flashcards[ns] && state.flashcards[ns].data) {
    isEmpty = (Object.keys(state.flashcards[ns].data).length == 0)
  }

  return {
    profile: CurrentUser.profile,
    ready: state.flashcards[ns] ? state.flashcards[ns].status === C.FB_FETCHED : null,
    flashcards: state.flashcards[ns] ? state.flashcards[ns].data : null,
    isEmpty: isEmpty
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
