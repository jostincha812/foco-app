import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable'

import api from '../data/api'
import { fetchFlashcardIds, fetchFlashcards, updateUserFlashcardPref } from '../actions/FlashcardActions'

import C from '../C'
import T from '../T'
import S, { spacing } from '../styles/styles'
import Icons from '../components/Icons'
import LoadingIndicator from '../components/LoadingIndicator'
import ProgressIndicatorBar from '../components/ProgressIndicatorBar'
import CardsStack from '../components/CardsStack'
import Flashcard from '../components/Flashcard'

class FlashcardsViewer extends React.Component {
  static navigationOptions = {
    title: ({ state }) => `Second Screen`,
    header: (navigation, defaultHeader) => ({
      ...defaultHeader,
      left: (
        <TouchableOpacity
          style={{top:spacing.xsmall/2, paddingLeft: spacing.small}}
          onPress={() => navigation.goBack() }>
          {Icons.back({tintColor: S.header.tintColor})}
        </TouchableOpacity>
      ),
    }),
  }

  constructor(props) {
    super(props)
    this.state = { done:false }
    this.onYesNoAction = this.onYesNoAction.bind(this)
    this.onBookmarkToggle = this.onBookmarkToggle.bind(this)
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

  render() {
    const spacer={flex:0.5, opacity:0, backgroundColor:'#fff'}

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
          style={[S.container, S.centeredContent]}
          >
          <TouchableOpacity
            style={[{width:240, height:240}, S.card, S.rounded, S.centeredContent]}
            onPress={() => this.props.navigation.goBack() }>
            <Text>Fin</Text>
          </TouchableOpacity>
        </Animatable.View>
      )
    }

    if (ready) {
      return (
        <View style={S.container}>
          <ProgressIndicatorBar progress={(i+1)/a.length} />
          <View style={spacer} />
          <View style={{flex:7, alignItems:'center'}}>
            <Animatable.View animation="fadeInDown" duration={200} ref="flashcardView">
              <Flashcard
                style={{width: '85%', height: '100%'}}
                key={current}
                data={flashcards[current]}
                prefs={flashcards[current].prefs}
                onBookmarkToggle={this.onBookmarkToggle}
              />
            </Animatable.View>
          </View>
          <View style={spacer} />
          <View style={{height:T.largeIconSize*2.5, flexDirection:'row', justifyContent:'space-around'}}>
            <TouchableOpacity
              style={{top:spacing.xsmall/2, paddingLeft: spacing.small}}
              onPress={() => this.onYesNoAction({type:C.ACTION_NO}) }>
              {Icons.noCircledOutline({size:T.largeIconSize*2, tintColor:T.noColor})}
            </TouchableOpacity>
            <TouchableOpacity
              style={{top:spacing.xsmall/2, paddingLeft: spacing.small}}
              onPress={() => this.onYesNoAction({type:C.ACTION_YES}) }>
              {Icons.yesCircledOutline({size:T.largeIconSize*2, tintColor:T.yesColor})}
            </TouchableOpacity>
          </View>
        </View>
      )
    } else {
      return (
        <View style={[S.container, S.centeredContent]}>
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
    fetchFlashcardIds: () => dispatch(fetchFlashcardIds()),
    fetchFlashcards: (ids, userId) => dispatch(fetchFlashcards(ids, userId)),
    updateUserFlashcardPref: (userId, flashcardId, prefs) => dispatch(updateUserFlashcardPref(userId, flashcardId, prefs))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlashcardsViewer)
