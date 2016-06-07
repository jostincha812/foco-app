import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../../styles';

class Section extends React.Component {
  render() {
    const s = this.props.data;
    return (
      <View style={styles.card} key={s.key}>
				<TouchableHighlight onPress={() => this.props.onSelectItem(s)}>
          <View>
						<Text style={styles.title} numberOfLines={2}>
							{s.title}
						</Text>
						<Text numberOfLines={1}>
							Chapters {s.chapters} {s.extras}
						</Text>
          </View>
				</TouchableHighlight>
			</View>
		);
  }
}
export default Section;
