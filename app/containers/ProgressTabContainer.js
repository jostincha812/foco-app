import React, { Component } from 'react'
import { View, Text } from 'react-native'

import styles from '../styles'

class ProgressHome extends React.Component {
  render() {
    return (
      <View style={styles.page}>
        <Text style={styles.title}>
          Progress Home
        </Text>
      </View>
    );
  }
}

export default ProgressHome;
