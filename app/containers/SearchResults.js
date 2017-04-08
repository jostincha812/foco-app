import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default class SearchResults extends React.Component {
  static navigationOptions = {
    title: ({ state }) => `Search Results`,
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
