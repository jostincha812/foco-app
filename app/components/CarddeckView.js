import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

import styles from '../styles';
import Carddeck from '../data/Carddeck';

export default class CarddeckView extends React.Component {
  render() {
    const d = new Carddeck(this.props.data);
    return (
      <View style={styles.card} id={d.id}>
				<TouchableHighlight onPress={() => this.props.onSelectItem(d)}>
          <View>
						<Text style={styles.title} numberOfLines={2}>
							{d.id}:{d.title}
						</Text>
						<Text numberOfLines={1}>
							Cards in deck {d.cardsInDeck()}
						</Text>
          </View>
				</TouchableHighlight>
			</View>
		);
  }
}
