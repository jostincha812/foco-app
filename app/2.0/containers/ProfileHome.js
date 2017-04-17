import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import C from '../C';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: ({ state }) => `Profile`,
  };
  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    return (
      <View>
        {/* <Text>Username: {params.username}</Text> */}
        <Text>Username</Text>
        <Button
          onPress={() => navigate(C.NAV_PROFILE_DETAILED)}
          title={`More`}
        />
      </View>
    );
  }
}
