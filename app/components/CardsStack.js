import React from 'react'
import { View } from 'react-native'
import { Card } from 'react-native-elements'

import T from '../T'
import S, { spacing } from '../styles/styles'

export default class CardsStack extends React.Component {
  render() {
    const card = (top, width) => {
      return (
        <View style={[S.card, S.rounded, {position:'absolute', top:top, width:width, height:'90%', alignSelf: 'center', borderWidth:1}]} />
      )
    }
    return (
      <View style={this.props.style}>
        {card(0, '92%')}
        {card(spacing.xsmall, '94%')}
        {card(spacing.xsmall*2, '96%')}
        {card(spacing.xsmall*3, '98%')}
      </View>

    )
  }
}
