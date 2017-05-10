import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'

import C from '../C'
import T from '../T'
import S, { spacing } from '../styles/styles'
import Icons from '../components/Icons'

import Flashcard from '../components/Flashcard'
import MockFlashcards from '../data/MockFlashcards'

class SecondLevelScreen extends React.Component {
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

  render() {
    const navigation = this.props.navigation
    const options = 'some options'

    const keys = Object.keys(MockFlashcards)
    const f = MockFlashcards[keys[5]]

    const spacer={flex:0.5, opacity:0, backgroundColor:'#fff'}

    return (
      <View style={S.container}>
        <View style={spacer} />
        <View style={{flex:7, alignItems:'center'}}>
            <Flashcard
              style={{width: '85%'}}
              front={f.front}
              back={f.back}
            />
        </View>
        <View style={spacer} />
        <View style={{flex:2.5, flexDirection:'row', justifyContent:'space-around'}}>
          {Icons.noCircledOutline({size:T.largeIconSize*2, tintColor:T.noColor})}
          {Icons.yesCircledOutline({size:T.largeIconSize*2, tintColor:T.yesColor})}
        </View>
        <View style={spacer} />
      </View>
    )
  }
}

function mapStateToProps (state) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecondLevelScreen)
