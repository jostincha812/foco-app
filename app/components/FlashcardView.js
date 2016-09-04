import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import C from '../constants';
import styles from '../styles';

export default class FlashcardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      side: C.SIDE_FRONT
    }
    this._renderCard = this._renderCard.bind(this);
    this._flipCard = this._flipCard.bind(this);
  }

  render() {
    if (!this.props.data) {
      return null
    }
    
    return (
      <View style={styles.card}>
				<TouchableHighlight onPress={this._flipCard}>
          {this._renderCard()}
				</TouchableHighlight>
			</View>
		);
  }

  _renderCard() {
    const d = this.props.data;
    return (
      <View>
        <Text style={styles.title}>
          {(this.state.side === C.SIDE_FRONT) ? d.front : d.back}
        </Text>
      </View>
    )
  }

  _flipCard() {
    console.log("flip card");
    if (this.state.side === C.SIDE_FRONT) {
      this.state.side = C.SIDE_BACK;
    } else {
      this.state.side = C.SIDE_FRONT;
    }
    // TODO re-render card
  }
}
