import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default class SearchResults extends React.Component {
  static navigationOptions = {
    // Nav options can be defined as a function of the navigation prop:
    title: ({ state }) => `${state.params.query}`
  };
  render() {
    const { params } = this.props.navigation.state;

    return (
      <View>
        <Text>Query: {params.query}</Text>
      </View>
    );
  }
}
