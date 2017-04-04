import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default class ProfileActivities extends React.Component {
  static navigationOptions = {
    // Nav options can be defined as a function of the navigation prop:
    title: ({ state }) => `User Activities`
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
