import React from 'react'
import { ScrollView, Text, View } from 'react-native'

import T from '../T'
import S from '../styles'
import Icons from './Icons'
import { localize } from '../locales'

export default class EmptyListScreen extends React.Component {
  render() {
    const props = this.props
    const color = props.inverse ? T.colors.inverse : T.colors.inactive

    return (
      <ScrollView
        style={S.containers.screen}
        contentContainerStyle={[props.contentContainerStyle, {flex:1}]}
        onLayout={props.onLayout}
        refreshControl={props.refreshControl}>

        {props.children}

        <View style={[S.containers.centered, {flex:1}]}>
          {Icons.pullDown({size:48, color:color})}
          <Text style={[S.text.subtitle, {color:color}]}>
            {localize("lists.empty")}
          </Text>
        </View>
      </ScrollView>
    )
  }
}
