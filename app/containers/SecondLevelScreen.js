import React from 'react'
import { ScrollView, TouchableOpacity, View, Text } from 'react-native'
import { connect } from 'react-redux'
import FlipCard from 'react-native-flip-card'

import C from '../C'
import S, { navigationStyles, spacing } from '../styles/styles'
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
          {Icons.back({tintColor: navigationStyles.header.tintColor})}
        </TouchableOpacity>
      ),
    }),
  }

  render() {
    const navigation = this.props.navigation
    const options = 'some options'

    const f = MockFlashcards['-KdPHHMWCGadVmqB4heI']

    return (
      <ScrollView style={S.container}>
        <Flashcard
          front={f.front}
          back={f.back}
        />
      </ScrollView>
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
