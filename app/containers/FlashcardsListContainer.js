import React from 'react'
import { connect } from 'react-redux'
import { fbAnalytics } from '../../configureFirebase'

import { TouchableOpacity, View, ScrollView } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Button } from 'react-native-elements'

import C, { E } from '../C'
import T from '../T'
import L from '../L'
import S from '../styles/styles'
import BaseContainer from './BaseContainer'
import Icons from '../components/Icons'
import FlashcardsList from '../components/FlashcardsList'
import LoadingIndicator from '../lib/LoadingIndicator'

import {
  fetchFlashcardIds,
  fetchFlashcards,
  resetFlashcardsState,
  updateUserFlashcardPref
} from '../actions/FlashcardActions'

class FlashcardsListContainer extends BaseContainer {
  static navigationOptions = ({navigation}) => {
    const hideLeft = navigation.state.params.hideLeft || false
    return ({
      title: null,
      headerLeft: hideLeft ? null : Icons.back({
        color: S.navigation.headerTintColor,
        style: {top:S.spacing.xsmall/2, paddingLeft: S.spacing.small},
        onPress: () => { navigation.goBack() }
      }),
    })
  }

  constructor(props) {
    super(props)
    this.state = { index:-1, current:null }
    this.onFinish = this.onFinish.bind(this)
    this.onPrefToggle = this.onPrefToggle.bind(this)
  }

  componentDidMount() {
    this.props.resetFlashcardsState()

    const navigation = this.props.navigation
    if (navigation) {
      const type = navigation.state.params.type
      const id = navigation.state.params.id
      const title = navigation.state.params.title
      const ids = navigation.state.params.ids
      const user = navigation.state.params.user
      const index = 0

      this.setCurrentScreen(E.flashcards_set_viewer, { id, title })
      this.logEvent(E.event_view_set, { id, title, type })

      if (ids) {
        this.setState({current:ids[index], index})
        this.props.fetchFlashcards(ids, user.uid)
      }
    }
  }

  componentWillUnmount() {
    this.props.resetFlashcardsState()
  }

  onFinish() {
    const navigation = this.props.navigation
    const type = navigation.state.params.type
    const id = navigation.state.params.id
    const title = navigation.state.params.title

    this.logEvent(E.event_view_set_completed, { id, title, type })
    this.props.resetFlashcardsState()
    this.props.navigation.goBack()
  }

  onPrefToggle(id, toggle) {
    const user = this.props.navigation.state.params.user
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

    if (ready && this.state.dimensions) {
      return (
        <FlashcardsList
          dimensions={this.state.dimensions}
          flashcards={flashcards}
          onPrefToggle={this.onPrefToggle}
        />
      )
    } else {
      return (
        <View
          style={[S.containers.screen, S.containers.centered]}
          onLayout={this.onLayout}>
          <LoadingIndicator />
        </View>
      )
    }
  }
}

function mapStateToProps (state) {
  return {
    ready: state.flashcards.status === C.FB_FETCHED,
    flashcards: state.flashcards.data,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    resetFlashcardsState: () => dispatch(resetFlashcardsState()),
    // fetchFlashcardIds: () => dispatch(fetchFlashcardIds()),
    fetchFlashcards: (ids, userId) => dispatch(fetchFlashcards(ids, userId)),
    updateUserFlashcardPref: (userId, flashcardId, prefs) => dispatch(updateUserFlashcardPref(userId, flashcardId, prefs))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlashcardsListContainer)
