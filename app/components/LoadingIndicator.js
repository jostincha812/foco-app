import React from 'react'
import { View } from 'react-native'

import Spinner from 'react-native-spinkit'

import T from '../T';
import S from '../styles/styles';

export default class LoadingIndicator extends React.Component {
  render() {
    // suitable spinner types: Pulse, Wave, ThreeBounce
    return (
      <View style={S.centeredContent}>
        <Spinner size={T.xlargeIconSize} type='ThreeBounce' color={T.accentColor} />
      </View>
    )
  }
}
