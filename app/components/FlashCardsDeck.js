import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

import styles from '../styles';
import FlashCard from './FlashCard';

export default class FlashCardDeck extends React.Component {
  constructor(props) {
    super(props);
    this._renderCard = this._renderCard.bind(this);
  }

  render() {
    // TODO data contains deck info and list of cards
    const d = this.props.data;
    const mt = this.props.marginTop;

    return (
      <View style={[{marginTop:mt}, styles.listContainer]}>
        <TouchableHighlight onPress={() => onSelectItem(d)}>
          <View style={[styles.cover,{justifyContent:'flex-end'}]}>
            <Text style={styles.title}>
              {d.title}
            </Text>
            <Text>
              {d.cardsInDeck} cards
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  _renderCard(i) {
    const onSelectItem = this.props.onSelectItem;
    return (
      <CardsDeck data={i} onSelectItem={() => onSelectItem(i)} />
    );
  }
}
