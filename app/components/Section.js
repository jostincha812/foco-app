import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles';

export default class Section extends React.Component {
  render() {
    const d = this.props.data;
    return (
      <View style={styles.card} key={d.id}>
				<TouchableHighlight onPress={() => this.props.onSelectItem(d)}>
          <View>
						<Text style={styles.title} numberOfLines={2}>
							{d.title}
						</Text>
						<Text numberOfLines={1}>
							Chapters {d.chapters.map(i => `${i} `)} {d.extras}
						</Text>
          </View>
				</TouchableHighlight>
			</View>
		);
  }
}
