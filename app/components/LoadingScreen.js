import React from 'react'
import { View } from 'react-native'

import S from '../styles/styles'
import LoadingIndicator from './LoadingIndicator'

export default class LoadingScreen extends React.Component {
  render() {
    const props = this.props
    return (
      <View
        style={[S.containers.screen, S.containers.centered]}
        onLayout={props.onLayout}>
        <LoadingIndicator />
      </View>
    )
  }
}
