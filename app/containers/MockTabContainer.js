import React, { PropTypes, Component } from 'react';
import { View, Text } from 'react-native';

import styles from '../styles';

class MockHome extends React.Component {
  render() {
    return (
      <View style={styles.page}>
        <Text style={styles.title}>
          Mock Exam
        </Text>
      </View>
    );
  }
}
export default MockHome;
