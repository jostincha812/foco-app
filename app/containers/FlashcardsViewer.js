import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import { Button } from 'react-native-elements'

import api from '../data/api'
import { fetchFlashcardIds, fetchFlashcards, resetFlashcardsState, updateUserFlashcardPref } from '../actions/FlashcardActions'

import C from '../C'
import T from '../T'
import L from '../L'
import S from '../styles/styles'
import Icons from '../components/Icons'
import Flashcard from '../components/Flashcard'

import CardsStack from '../lib/CardsStack'
import LoadingIndicator from '../lib/LoadingIndicator'
import ProgressIndicatorBar from '../lib/ProgressIndicatorBar'

class FlashcardsViewer extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: null,
    headerLeft: (
      <TouchableOpacity
        style={{top:S.spacing.xsmall/2, paddingLeft: S.spacing.small}}
        onPress={() => navigation.goBack() }>
        {Icons.back({color: S.navigation.headerTintColor})}
      </TouchableOpacity>
    ),
  })

  constructor(props) {
    super(props)
    this.state = { done:false }
    this.onYesNoAction = this.onYesNoAction.bind(this)
    this.onBookmarkToggle = this.onBookmarkToggle.bind(this)
    this.onStarToggle = this.onStarToggle.bind(this)
    this.goBack = this.goBack.bind(this)
  }

  componentWillMount() {
    if (this.props.navigation) {
      const ids = this.props.navigation.state.params.ids
      const user = this.props.navigation.state.params.user

      if (ids) {
        this.setState({current:ids[0]})
        this.props.fetchFlashcards(ids, user.id)
      }
    }
  }

  componentWillUnmount() {
    this.props.resetFlashcardsState()
  }

  goBack() {
    this.props.navigation.goBack()
  }

  onYesNoAction(action) {
    const user = this.props.navigation.state.params.user
    const flashcard = this.props.flashcards[this.state.current]

    let val = false
    if (action.type === C.ACTION_YES) {
      val = true
    }
    if (action.type === C.ACTION_NO) {
      // do nothing, val = false
    }

    this.props.updateUserFlashcardPref(
      user.id,
      flashcard.id,
      {
        key: C.KEY_PREF_KEEP,
        val
      }
    )

    let animation = this.refs.flashcardView.fadeOutRightBig
    if (action.type === C.ACTION_YES) {
      // do nothing
    } else {
      animation = this.refs.flashcardView.fadeOutLeftBig
    }

    const a = Object.keys(this.props.flashcards)
    const i = a.indexOf(this.state.current)
    animation(500).then(endState => {
      if (i < a.length - 1) {
        this.setState({current: a[i+1]})
        this.refs.flashcardView.fadeInDown(200)
      } else {
        this.setState({done: true})
      }
    })
  }

  onBookmarkToggle(isBookmarked, id) {
    const user = this.props.navigation.state.params.user
    const flashcard = this.props.flashcards[id]
    this.props.updateUserFlashcardPref(
      user.id,
      flashcard.id,
      {
        key: C.KEY_PREF_BOOKMARKED,
        val: isBookmarked
      }
    )
  }

  onStarToggle(isStarred, id) {
    const user = this.props.navigation.state.params.user
    const flashcard = this.props.flashcards[id]
    this.props.updateUserFlashcardPref(
      user.id,
      flashcard.id,
      {
        key: C.KEY_PREF_STARRED,
        val: isStarred
      }
    )
  }

  render() {
    const spacer={flex:0.5, opacity:0, backgroundColor:T.transparent}

    const ready = this.props.ready
    const flashcards = this.props.flashcards
    const current = this.state.current
    const a = Object.keys(this.props.flashcards)
    const i = a.indexOf(this.state.current)

    if (this.state.done) {
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
            onPress={this.goBack}
          />
        </Animatable.View>
      )
    }

    if (ready) {
      return (
        <View style={S.containers.screen}>
          <ProgressIndicatorBar progress={(i+1)/a.length} />
          <View style={spacer} />
          <View style={{flex:7, width:'85%', alignSelf:'center', alignItems:'center'}}>
            <Animatable.View animation="fadeInDown" duration={200} ref="flashcardView">
              <Flashcard
                style={{width: '100%', height: '100%'}}
                key={current}
                data={flashcards[current]}
                prefs={flashcards[current].prefs}
                onBookmarkToggle={this.onBookmarkToggle}
                onStarToggle={this.onStarToggle}
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
    ready: state.flashcards.isReady,
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
