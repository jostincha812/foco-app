import React from 'react'
import { ScrollView, Text } from 'react-native'

import T from '../T'
import S from '../styles'
import { localize } from '../locales'

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

        {props.children}

        <Text style={S.text.subtitle} color={color}>
          {localize("lists.empty")}
        </Text>
      </ScrollView>
    )
  }
}
