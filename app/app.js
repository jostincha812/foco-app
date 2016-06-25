/*
 *
 * App
 *
 */

import React, { Component } from 'react';
import { View } from 'react-native';

import styles from './styles';
import GlobalNavigation from './containers/GlobalNavigation';

export default class App extends Component {
	render() {
		return (
			<View style={styles.appContainer}>
				<GlobalNavigation />
			</View>
		);
	}
}
