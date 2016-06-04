import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from '../../styles';

class SectionDetails extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {this.props.section.description}
        </Text>
      </View>
    );
  }
}
export default SectionDetails;
