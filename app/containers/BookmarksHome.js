import React from 'react';
import { TabNavigator } from 'react-navigation';
import {
  Text,
  View,
} from 'react-native';

import S from '../styles/styles';

export default class BookmarksHome extends React.Component {
  static navigationOptions = {
    title: ({ state }) => `Bookmarked`,
  };
  render() {
    const { params } = this.props.navigation.state;

    return (
      <View style={S.container}>
        <View style={S.card}>
          <Text>//empty</Text>
        </View>
      </View>
    );
  }
}
