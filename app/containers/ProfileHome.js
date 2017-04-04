import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import N from '../navigation/N';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    // Nav options can be defined as a function of the navigation prop:
    title: ({ state }) => `Profile`
  };
  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    return (
      <View>
        {/* <Text>Username: {params.username}</Text> */}
        <Text>Username</Text>
        <Button
          onPress={() => navigate(N.NAV_PROFILE_DETAILED)}
          title={`More`}
        />
      </View>
    );
  }
}
