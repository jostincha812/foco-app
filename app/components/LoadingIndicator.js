import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import T from '../T';
import S from '../styles/styles';

export default class LoadingIndicator extends React.Component {
  render() {
    return (
      <View style={S.centeredContent}>
        <Text style={{fontSize:T.titleFontSize}}>Loading ...</Text>
      </View>
    )
  }
}
