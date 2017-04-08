import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import S from '../styles/styles';

export default class CardSetDetailed extends React.Component {
  static navigationOptions = {
    title: ({ state }) => `Detailed card set with a very long set name`,
  };
  render() {
    const { params } = this.props.navigation.state;

    return (
      <View>
        <Text>Options: {params.options}</Text>
      </View>
    );
  }
}
