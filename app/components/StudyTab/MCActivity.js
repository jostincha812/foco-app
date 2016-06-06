import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from '../../styles';

class MCActivity extends React.Component {
  render() {
    const act = this.props.data;
    return (
      <View style={styles.container} key={act.key}>
        <Text style={[styles.card, styles.title]}>
          {act.title}
        </Text>
      </View>
    )
  }
}

export default MCActivity;
