import React from 'react'
import { connect } from 'react-redux'
import { fbAnalytics } from '../../configureFirebase'

import { TouchableOpacity, View, Text } from 'react-native'
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

class FlashcardsViewer extends BaseContainer {
  static navigationOptions = ({navigation}) => {
    const type = navigation.state.params.type
    const id = navigation.state.params.id
    const title = navigation.state.params.title

    return ({
      title: null,
      headerTitle: null,
      headerLeft: Icons.back({
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
    this.onYesNoAction = this.onYesNoAction.bind(this)
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
    this.props.navigation.navigate(C.NAV_HOME)
  }

  onYesNoAction(action) {
    const user = this.props.navigation.state.params.user
    const ids = this.props.navigation.state.params.ids
    const flashcard = this.props.flashcards[this.state.current]
    const pref = {
      key: C.KEY_PREF_KEEP,
      val: action.type === C.ACTION_YES,
    }

    this.props.updateUserFlashcardPref(
      user.uid,
      flashcard.id,
      pref
    )
    this.logEvent(E.event_update_flashcard_pref, {
      userId: user.uid,
      flashcardId: flashcard.id,
      pref
    })

    let animation = this.refs.flashcardView.fadeOutRightBig
    if (action.type === C.ACTION_YES) {
      // do nothing
    } else {
      animation = this.refs.flashcardView.fadeOutLeftBig
    }

    const index = this.state.index + 1
    animation(500).then(endState => {
      if (index < ids.length) {
        this.setState({index, current:ids[index]})
        this.refs.flashcardView.fadeInDown(200)
      } else {
        this.setState({index, current:null})
      }
    })
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
    const spacer={flex:0.5, opacity:0, backgroundColor:T.transparent}

    const props = this.props
    const navigation = props.navigation
    const ready = props.ready
    const flashcards = props.flashcards

    const ids = this.props.navigation.state.params.ids
    const current = this.state.current
    const index = this.state.index
    const progress = (index+1)/ids.length

    if (progress > 1) {
      return (
        <Animatable.View
          animation="fadeIn"
          duration={500}
          style={[S.containers.screen, S.containers.centered]}
          >
          <Button
            title={L.done}
            raised={true}
            icon={{name: 'done-all'}}
            iconRight={true}
            borderRadius={S.spacing.xsmall}
            backgroundColor={T.colors.active}
            buttonStyle={{width:320}}
            onPress={this.onFinish}
          />
        </Animatable.View>
      )
    }

    if (ready) {
      return (
        <View style={S.containers.screen}>
          <ProgressIndicatorBar progress={progress} />
          <View style={spacer} />
          <View style={{flex:7, width:320, alignSelf:'center', alignItems:'center'}}>
            <Animatable.View animation="fadeInDown" duration={200} ref="flashcardView">
              <Flashcard
                style={{width: 320, height: '100%'}}
                key={current}
                data={flashcards[current]}
                prefs={flashcards[current].prefs}
                onPrefToggle={this.onPrefToggle}
              />
            </Animatable.View>
          </View>
          <View style={spacer} />
          <View style={{width:320, alignSelf:'center', paddingBottom:S.spacing.xlarge, flexDirection:'row', justifyContent:'space-around'}}>
            <View style={{width:'42.5%'}}>
              <Button
                title={L.discard}
                buttonStyle={{marginLeft:0, width:'100%'}}
                raised={true}
                // iconComponent={Icons.noCircledOutline({size:T.iconSize, tintColor:T.noColor})}
                borderRadius={S.spacing.xsmall}
                backgroundColor={T.colors.inactive}
                onPress={() => this.onYesNoAction({type:C.ACTION_NO})}
              />
            </View>
            <View style={{width:'42.5%'}}>
              <Button
                title={L.keep}
                buttonStyle={{marginLeft:0, width:'100%'}}
                raised={true}
                // icon={{name:'playlist-add-check'}}
                // iconRight={true}
                // iconComponent={Icons.yesCircledOutline({size:T.iconSize, tintColor:T.noColor})}
                borderRadius={S.spacing.xsmall}
                backgroundColor={T.colors.yes}
                onPress={() => this.onYesNoAction({type:C.ACTION_YES})}
              />
            </View>
          </View>
        </View>
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
)(FlashcardsViewer)
