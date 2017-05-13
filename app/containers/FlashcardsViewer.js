import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'

import C from '../C'
import T from '../T'
import S, { spacing } from '../styles/styles'
import Icons from '../components/Icons'

import { updateUserFlashcardPreference } from '../actions/FlashcardActions'
import Flashcard from '../components/Flashcard'
import MockFlashcards from '../data/MockFlashcards'

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
    this.onYesNoAction = this.onYesNoAction.bind(this)
    this.onBookmarkToggle = this.onBookmarkToggle.bind(this)
  }

  onYesNoAction(action) {
    const user = this.props.user
    const flashcard = this.props.flashcard

    let keepVal = false
    if (action.type === C.ACTION_YES) {
      keepVal = true
    }
    if (action.type === C.ACTION_NO) {
      // do nothing
    }

    this.props.updateUserFlashcardPreference({
      user: user,
      flashcard: flashcard,
      key: C.KEY_PREF_KEEP,
      val: keepVal
    })
  }

  onBookmarkToggle(isBookmarked) {
    const user = this.props.user
    const flashcard = this.props.flashcard
    this.props.updateUserFlashcardPreference({
      user: user,
      flashcard: flashcard,
      key: C.KEY_PREF_BOOKMARKED,
      val: isBookmarked
    })
  }

  render() {
    const navigation = this.props.navigation

    const f = this.props.flashcard
    const u = this.props.user

    const spacer={flex:0.5, opacity:0, backgroundColor:'#fff'}

    return (
      <View style={S.container}>
        <View style={spacer} />
        <View style={{flex:7, alignItems:'center'}}>
            <Flashcard
              style={{width: '85%'}}
              data={f.data}
              onBookmarkToggle={this.onBookmarkToggle}
            />
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
        {/* <View style={spacer} /> */}
      </View>
    )
  }
}

function mapStateToProps (state) {
  // TODO: remove mock data
  const keys = Object.keys(MockFlashcards)
  const key = keys[5]

  return {
    // TODO: remove mock data
    user: {
      id: '12345',
      username: 'lovince',
    },
    flashcard: {
      id: key,
      data: MockFlashcards[key]
    },
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateUserFlashcardPreference: (options) => dispatch(updateUserFlashcardPreference(options))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlashcardsViewer)
