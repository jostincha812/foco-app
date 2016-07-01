import React, { Component } from 'react';
import { View, Text, TouchableHighlight, ListView } from 'react-native';

import styles from '../styles';
import { flashcards } from '../data/TestData';
import CardsDeck from './CardsDeck';

const dataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2,
});

export default class StudySection extends React.Component {
  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
  }

  render() {
    // TODO data contains section info and list of card decks for section
    const d = this.props.data;
    const mt = this.props.marginTop;
    const onSelectItem = this.props.onSelectItem;
    const ds = dataSource.cloneWithRows(flashcards);

    return (
      <View style={[{marginTop:mt}, styles.listContainer]}>
        <TouchableHighlight onPress={() => onSelectItem(d)}>
          <View style={[styles.cover,{justifyContent:'flex-end'}]}>
            <Text style={styles.title}>
              Chapters {d.chapters.map(i => `${i} `)} {d.extras}
            </Text>
          </View>
        </TouchableHighlight>
        <ListView dataSource={ds} renderRow={this._renderItem} />
      </View>
    );
  }

  _renderItem(i) {
    const onSelectItem = this.props.onSelectItem;
    return (
      <CardsDeck data={i} onSelectItem={() => onSelectItem(i)} />
    );
  }
}
