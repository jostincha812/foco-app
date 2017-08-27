import React from 'react'
import { View } from 'react-native'

import Spinner from 'react-native-spinkit'

import T from '../T';
import S from '../styles/styles';

export default class LoadingIndicator extends React.Component {
  render() {
    // suitable spinner types: Pulse, Wave, ThreeBounce
    const type = 'ThreeBounce'
    const color = this.props.inverse ? T.colors.inverse : T.colors.app
    const size = this.props.large ? T.icons.xlargeIcon : T.icons.largeIcon
    
    return (
      <View style={S.centeredContent}>
        <Spinner type={type} size={size} color={color} />
      </View>
    )
  }
}
