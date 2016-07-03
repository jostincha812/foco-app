import React, { Component } from 'react'
import { View, Text } from 'react-native'

import styles from '../styles'

class ProfileHome extends React.Component {
  render() {
    return (
      <View style={styles.page}>
        <Text style={styles.title}>
          Profile Home
        </Text>
      </View>
    );
  }
}

export default ProfileHome;
