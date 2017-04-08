import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import T from '../T';

export default class ProfileActivities extends React.Component {
  static navigationOptions = {
    title: ({ state }) => `Profile`,
  };
  render() {
    const { params } = this.props.navigation.state;

    return (
      <View>
        {/* <Text>Username: {params.username}</Text> */}
        <Text>activities list</Text>
      </View>
    );
  }
}
