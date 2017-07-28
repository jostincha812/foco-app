import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import { Button } from 'react-native-elements'

import C from '../C'
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
  static navigationOptions = ({navigation}) => ({
    title: null,
    headerTitle: null,
    headerLeft: Icons.back({
      color: S.navigation.headerTintColor,
      style: {top:S.spacing.xsmall/2, paddingLeft: S.spacing.small},
      onPress: () => navigation.goBack()
    }),
  })

  constructor(props) {
    super(props)
    this.state = { index:-1, current:null }
    this.onFinish = this.onFinish.bind(this)
    this.onYesNoAction = this.onYesNoAction.bind(this)
    this.onPrefToggle = this.onPrefToggle.bind(this)
  }

  componentWillMount() {
    this.props.resetFlashcardsState()
    if (this.props.navigation) {
      const ids = this.props.navigation.state.params.ids
      const user = this.props.navigation.state.params.user
      const index = 0

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
    this.props.resetFlashcardsState()
    this.props.navigation.navigate(C.NAV_HOME)
  }

  onYesNoAction(action) {
    const user = this.props.navigation.state.params.user
    const ids = this.props.navigation.state.params.ids
    const flashcard = this.props.flashcards[this.state.current]

    this.props.updateUserFlashcardPref(
      user.uid,
      flashcard.id,
      {
        key: C.KEY_PREF_KEEP,
        val: action.type === C.ACTION_YES,
      }
    )

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

  onPrefToggle(id, pref) {
    const user = this.props.navigation.state.params.user
    const flashcard = this.props.flashcards[id]
    this.props.updateUserFlashcardPref(
      user.uid,
      flashcard.id,
      {
        key: Object.keys(pref)[0],
        val: Object.values(pref)[0]
      }
    )
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
            icon={{name: 'check'}}
            iconRight={true}
            borderRadius={S.spacing.xsmall}
            backgroundColor={T.colors.active}
            buttonStyle={{width:'80%'}}
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
          <View style={{flex:7, width:'85%', alignSelf:'center', alignItems:'center'}}>
            <Animatable.View animation="fadeInDown" duration={200} ref="flashcardView">
              <Flashcard
                style={{width: '100%', height: '100%'}}
                key={current}
                data={flashcards[current]}
                prefs={flashcards[current].prefs}
                onPrefToggle={this.onPrefToggle}
              />
            </Animatable.View>
          </View>
          <View style={spacer} />
          <View style={{width:'85%', alignSelf:'center', paddingBottom:S.spacing.xlarge, flexDirection:'row', justifyContent:'space-around'}}>
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
                icon={{name:'playlist-add-check'}}
                iconRight={true}
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
