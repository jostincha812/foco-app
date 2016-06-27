import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

import styles from '../styles';

export default class SectionDetails extends React.Component {
  render() {
    const s = this.props.data;
    const st = this.props.style;

    return (
      <View style={[st, styles.container]}>
        <TouchableHighlight onPress={() => this.props.onSelectCardsDeck(s)}>
          <Text style={[styles.card, styles.title]}>
            Chapters {s.chapters} {s.extras}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}
