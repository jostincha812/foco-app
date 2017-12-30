import React from 'react'
import { Text } from 'react-native'

import T from '../T'
import L from '../L'
import S from '../styles/styles'

export default class EmptyIndicator extends React.Component {
  render() {
    const color = this.props.inverse ? T.colors.inverse : T.colors.normal

    return (
      <Text style={S.text.subtitle} color={color}>
        {L.empty}
      </Text>
    )
  }
}
