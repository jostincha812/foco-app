import React from 'react'
import { View } from 'react-native'
import { Card } from 'react-native-elements'

import T from '../T'
import S from '../styles/styles'

export default class CardsStack extends React.Component {
  render() {
    const card = (top, width) => {
      return (
        <View style={[
          S.cards.card,
          S.cards.rounded,
          {position:'absolute', top:top, width:width, height:'90%', alignSelf: 'center', borderWidth:1}
        ]} />
      )
    }
    return (
      <View style={this.props.style}>
        {card(0, '92%')}
        {card(S.spacing.xsmall, '94%')}
        {card(S.spacing.xsmall*2, '96%')}
        {card(S.spacing.xsmall*3, '98%')}
      </View>

    )
  }
}
