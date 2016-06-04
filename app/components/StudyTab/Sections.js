import React, { PropTypes, Component } from 'react';
import { View, Text, ScrollView, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../../styles';

const data = [
  { key: 'france', title: 'France', description: 'France' },
  { key: 'germany', title: 'Germany', description: 'Germany' },
  { key: 'italy', title: 'Italy', description: 'Italy' },
  { key: 'spain_portugal', title: 'Spain & Portugal', description: 'Spain & Portugal (excluding Port)' },
].map(d => Object.assign(d, {icon: <Icon name='map' />}));

class Sections extends React.Component {
  render() {
    const sections = (s) => (
			<View style={styles.cell} key={s.key}>
				<TouchableHighlight onPress={() => this.props.onSelectItem(s)}>
          <View>
							<Text style={styles.title} numberOfLines={2}>
								{s.title}
							</Text>
							<Text numberOfLines={1}>
								{s.description}
							</Text>
          </View>
				</TouchableHighlight>
			</View>
		);
		return (
			<ScrollView automaticallyAdjustContentInsets={true}>
				{data.map(sections)}
			</ScrollView>
		);
  }
}
export default Sections;
