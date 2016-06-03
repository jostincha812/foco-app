import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'

import styles from '../../styles'

class PracticeHome extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Practice Home
        </Text>
      </View>
    );
  }
}

export default PracticeHome;
