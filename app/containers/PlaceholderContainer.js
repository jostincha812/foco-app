import React, { Component } from 'react'
import { View, Text } from 'react-native'

import styles from '../styles'

class PlaceholderContainer extends React.Component {
  render() {
    return (
      <View style={styles.page}>
        <Text style={styles.title}>
          Placeholder
        </Text>
      </View>
    );
  }
}

export default PlaceholderContainer;
