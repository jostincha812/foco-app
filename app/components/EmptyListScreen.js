import React from 'react'
import { ScrollView, Text } from 'react-native'

import T from '../T'
import L from '../L'
import S from '../styles/styles'

export default class EmptyListScreen extends React.Component {
  render() {
    const props = this.props
    const color = props.inverse ? T.colors.inverse : T.colors.normal

    return (
      <ScrollView
        style={S.containers.screen}
        contentContainerStyle={[S.containers.centered, {flex:1}]}
        onLayout={props.onLayout}
        refreshControl={props.refreshControl}>

        <Text style={S.text.subtitle} color={color}>
          {L.empty}
        </Text>
      </ScrollView>
    )
  }
}
