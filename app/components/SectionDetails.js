import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

import styles from '../styles';

class SectionDetails extends React.Component {
  render() {
    const s = this.props.data;

    const act = {
      key: 'mcActivity',
      title: 'test ' + s.title,
    }

    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => this.props.onSelectActivity(act)}>
          <Text style={[styles.card, styles.title]}>
            Chapters {s.chapters} {s.extras}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}
export default SectionDetails;
