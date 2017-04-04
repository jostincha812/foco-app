import React from 'react';
import { TabNavigator } from 'react-navigation';

import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default class BookmarksHome extends React.Component {
  static navigationOptions = {
    // Nav options can be defined as a function of the navigation prop:
    title: ({ state }) => `Bookmark?`
  };
  render() {
    const { params } = this.props.navigation.state;

    return (
        <Text>Bookmarked</Text>
    );
  }
}
