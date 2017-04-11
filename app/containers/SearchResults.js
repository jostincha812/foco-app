import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import C from '../C';
import S from '../styles/styles';

export default class SearchResults extends React.Component {
  static navigationOptions = {
    title: ({ state }) => `Search Results`,
  };
  render() {
    const { params } = this.props.navigation.state;

    return (
      <View style={[S.container, S.centeredContent]}>
        <Text>Query: {params.query}</Text>
      </View>
    );
  }
}
