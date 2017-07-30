import React from 'react'
import { View, Text } from 'react-native'

import C from '../C'
import T from '../T'
import L from '../L'
import S from '../styles/styles'

export default class Intro extends React.Component {
  render() {
    const style = this.props.style
    return (
      <View style={[style]}>
        <Text style={S.text.title}>{C.FOCO}</Text>
      </View>
    )
  }
}
