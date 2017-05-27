import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'

import C from '../C'
import T from '../T'
import S, { spacing } from '../styles/styles'
import Icons from '../components/Icons'

import api from '../data/api'

import { fetchFlashcards, updateUserFlashcardPref } from '../actions/FlashcardActions'
import { fetchUserFlashcardPrefs } from '../actions/FlashcardActions'
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
    this.state = {}
    this.onYesNoAction = this.onYesNoAction.bind(this)
    this.onBookmarkToggle = this.onBookmarkToggle.bind(this)
  }

  componentWillMount() {
    if (this.props.navigation) {
      const keys = this.props.navigation.state.params.keys
      const user = this.props.navigation.state.params.user

      this.setState({keys, user})
      this.props.getFlashcards(keys)
      this.props.getUserFlashcardPrefs(user)
    }
  }

  onYesNoAction(action) {
    const user = this.state.user
    const flashcard = this.props.flashcards[this.state.index]

    let keepVal = false
    if (action.type === C.ACTION_YES) {
      keepVal = true
    }
    if (action.type === C.ACTION_NO) {
      // do nothing, keepVal = false
    }

    this.props.updateUserFlashcardPref({
      user,
      flashcard: flashcard,
      key: C.KEY_PREF_KEEP,
      val: keepVal
    })
  }

  onBookmarkToggle(isBookmarked, id) {
    const user = this.state.user
    const flashcard = this.props.flashcards[id]
    this.props.updateUserFlashcardPref({
      user,
      flashcard: flashcard,
      key: C.KEY_PREF_BOOKMARKED,
      val: isBookmarked
    })
  }

  render() {
    const spacer={flex:0.5, opacity:0, backgroundColor:'#fff'}

    const ready = this.props.ready
    const flashcards = this.props.flashcards
    const prefs = this.props.userFlashcardPrefs

    return (
      <View style={S.container}>
        <View style={spacer} />
        <View style={{flex:7, alignItems:'center'}}>
          { ready && Object.keys(flashcards).map(k =>
              <Flashcard
                style={{width: '85%'}}
                key={k}
                data={flashcards[k]}
                prefs={prefs[k]}
                onBookmarkToggle={this.onBookmarkToggle}
              />
            )
          }
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
  }
}

function mapStateToProps (state) {
  const flashcards = {}
  const userFlashcardPrefs = {}

  // TODO remove debug messages
  // console.log('mapStateToProps')
  // if (state.flashcards.isReady) {
  //   console.log(state.flashcards.data)
  // }
  return {
    ready: state.flashcards.isReady,
    flashcards: state.flashcards.data,
    userFlashcardPrefs: state.userFlashcardPrefs.data,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getFlashcards: (keys) => dispatch(fetchFlashcards(keys)),
    getUserFlashcardPrefs: (user) => dispatch(fetchUserFlashcardPrefs(user)),
    updateUserFlashcardPref: (options) => dispatch(updateUserFlashcardPref(options))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlashcardsViewer)
