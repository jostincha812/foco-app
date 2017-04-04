import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default class CardSetDetailed extends React.Component {
  static navigationOptions = {
    // Nav options can be defined as a function of the navigation prop:
//    title: ({ state }) => `CardSetDetailed`
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
