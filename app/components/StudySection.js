import React, { Component } from 'react';
import { View, Text, TouchableHighlight, ListView } from 'react-native';

import styles from '../styles';
import { flashcards } from '../data/TestData';
import CardsDeckList from './CardsDeckList';

const dataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2,
});

export default class StudySection extends React.Component {
  render() {
    const d = this.props.data;
    const st = this.props.style;
    const onSelectItem = this.props.onSelectItem;
    const ds = dataSource.cloneWithRows(flashcards);

    return (
      <View style={[st, styles.container]}>
        <TouchableHighlight onPress={() => onSelectItem(d)}>
          <View style={[styles.cover,{justifyContent:'flex-end'}]}>
            <Text style={styles.title}>
              Chapters {d.chapters.map(i => `${i} `)} {d.extras}
            </Text>
          </View>
        </TouchableHighlight>
        <CardsDeckList {...this.props} dataSource={ds} />
      </View>
    );
  }
}
