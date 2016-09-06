import React, { Component } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'

import styles from '../styles'

class ProfileHome extends React.Component {
  constructor(props) {
    super(props);
    this._onPressButton = this._onPressButton.bind(this);
  }

  render() {
    return (
      <View style={styles.page}>
        <Text style={styles.title}>
          Profile Home
        </Text>
        <TouchableHighlight onPress={this._onPressButton}>
          <Text style={styles.title}>
            Sign Out
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  _onPressButton() {
    firebase.auth().signOut();
  }
}

export default ProfileHome;
