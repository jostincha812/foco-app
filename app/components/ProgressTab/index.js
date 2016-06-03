import React, { Component } from 'react'
import { View, Text } from 'react-native'
import {Actions} from 'react-native-router-flux'

import styles from '../../styles'

class ProgressHome extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Progress Home
        </Text>
      </View>
    );
  }
}

export default ProgressHome;
