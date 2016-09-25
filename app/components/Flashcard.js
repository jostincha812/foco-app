import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

import FlipCard from 'react-native-flip-card';
import Markdown from 'react-native-simple-markdown';
import Icon from 'react-native-vector-icons/FontAwesome';

import C from '../constants';
import styles, { G } from '../styles';

export default class Flashcard extends React.Component {
  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
    this._onFlipped = this._onFlipped.bind(this);
  }

  render() {
    if (!this.props.data) {
      return null
    }

    const d = this.props.data;
    return (
      <FlipCard
        style={styles.flashcard}
        friction={10}
        perspective={1000}
        flipHorizontal={true}
        flipVertical={false}
        flip={false}
        clickable={true}
        onFlipped={this._onFlipped}
      >
        <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
          <View style={{alignItems:'center'}}>
            <Markdown styles={styles}>## {d.front}</Markdown>
          </View>

          {d.points &&
            <View style={{alignItems:'flex-end'}}>
              <Markdown styles={styles}>### *{d.points} points*</Markdown>
            </View>
          }
        </View>
        <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
          {d.points &&
            <View style={{alignItems:'center'}}>
              <Markdown styles={styles}>### *{d.points} points*</Markdown>
            </View>
          }
          {d.back &&
            Object.entries(d.back).map(entry => this._renderItem({id:entry[0], ...entry[1]}))
          }
        </View>
      </FlipCard>
		);
  }

  _renderItem(i) {
    return (
      <View key={i.id} style={{marginTop:G.NORMAL}}>
        <Markdown styles={styles}>###{i.t}</Markdown>
        {i.p &&
          <View style={{alignItems:'flex-start'}}>
            <Markdown styles={styles}>#### _{i.p} points_</Markdown>
          </View>
        }
      </View>
    );
  }

  _onFlipped(isFlipped) {
    console.log('isFlipped: ', isFlipped)
  }
}
