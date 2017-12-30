import React from 'react'
import { ScrollView } from 'react-native'

import L from '../L'
import S from '../styles/styles'
import EmptyIndicator from '../lib/EmptyIndicator'

export default class EmptyListScreen extends React.Component {
  render() {
    const props = this.props
    return (
      <ScrollView
        style={S.containers.screen}
        contentContainerStyle={[S.containers.centered, {flex:1}]}
        onLayout={props.onLayout}
        refreshControl={props.refreshControl}>
        <EmptyIndicator />
      </ScrollView>
    )
  }
}
