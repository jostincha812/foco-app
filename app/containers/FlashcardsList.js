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
import Flashcard from '../components/Flashcard'

import LoadingIndicator from '../lib/LoadingIndicator'
import ProgressIndicatorBar from '../lib/ProgressIndicatorBar'

import {
  fetchFlashcardIds,
  fetchFlashcards,
  resetFlashcardsState,
  updateUserFlashcardPref
} from '../actions/FlashcardActions'

class FlashcardsList extends BaseContainer {
  static navigationOptions = ({navigation}) => {
    const type = navigation.state.params.type
    const id = navigation.state.params.id
    const title = navigation.state.params.title
    const hideLeft = navigation.state.params.hideLeft || false

    return ({
      headerLeft: hideLeft ? null : Icons.back({
        color: S.navigation.headerTintColor,
        style: {top:S.spacing.xsmall/2, paddingLeft: S.spacing.small},
        onPress: () => {
          fbAnalytics.logEvent(E.event_view_set_aborted, { id, title, type })
          navigation.goBack()
        }
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
    const ids = this.props.navigation.state.params.ids

    // If dimensions is defined, render the real view otherwise the dummy view
    // if (this.state.dimensions) {
    //   var { dimensions } = this.state
    //   var { width, height } = dimensions
    //   // do stuff
    //   ...
    // }

    if (ready) {
      return (
        <ScrollView
          style={[S.containers.screen, S.containers.normal, {backgroundColor:'transparent'}]}
          pagingEnabled={true}
          onLayout={this.onLayout}
          >
            { (flashcards && this.state.dimensions) &&
              ids.map((id, index) => {
                const { width, height } = this.state.dimensions
                const item = flashcards[id]
                return (
                  <Flashcard
                    style={{
                      height: height - 2*S.spacing.normal,
                      marginTop: (index==0) ? 0 : S.spacing.normal,
                      marginBottom: (index==ids.length-1) ? S.spacing.normal*2 : S.spacing.normal
                    }}
                    key={item.id}
                    data={item}
                    prefs={item.prefs}
                    onPrefToggle={this.onPrefToggle}
                  />
                )
              })
            }
        </ScrollView>
      )
    } else {
      return (
        <View style={[S.containers.screen, S.containers.centered]}>
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
    fetchFlashcardIds: () => dispatch(fetchFlashcardIds()),
    fetchFlashcards: (ids, userId) => dispatch(fetchFlashcards(ids, userId)),
    updateUserFlashcardPref: (userId, flashcardId, prefs) => dispatch(updateUserFlashcardPref(userId, flashcardId, prefs))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlashcardsList)
