import React from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';

import N from '../navigation/N';
import S from '../styles/styles';

export default class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    const { navigate } = this.props.navigation;
    const options = 'Siri';

    return (
      <View style={S.container}>
        <Text style={S.welcome}>
          Foco:3 by VPQLabs!
        </Text>
        <Text style={S.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={S.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <Button
          onPress={() => navigate(N.NAV_HOME_DETAILED, { options: options })}
          title={`Next -> ${options}`}
        />
      </View>
    );
  }
}
