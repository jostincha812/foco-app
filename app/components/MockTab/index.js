import React, { PropTypes, Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import styles from '../../styles';

class MockHome extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Mock Exam
        </Text>
      </View>
    );
  }
}
export default MockHome;
