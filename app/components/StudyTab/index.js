/*
*
* StudyHome
*
*/

import React, { Component } from 'react';
import { View, Platform, NavigationExperimental, TouchableHighlight, Image } from 'react-native';
import { connect } from 'react-redux';

import styles from '../../styles';
import Sections from './Sections';
import SectionDetails from './SectionDetails';

const { Header: NavigationHeader, CardStack: NavigationCardStack } = NavigationExperimental;
const NavigationHeaderBackButton = require('NavigationHeaderBackButton');

class StudyHome extends Component {
	render() {
		return (
			<View />
		);
		
		return (
			<NavigationCardStack
				direction={'horizontal'}
				navigationState={this.props.navigation}
				onNavigate={this._onNavigate}
				renderScene={this._renderScene.bind(this)}
				renderOverlay={this._renderHeader.bind(this)}
				style={styles.main}
			/>
		);
	}

	_renderHeader(props) {
		const showHeader = props.scene.navigationState.title &&
			(Platform.OS === 'ios' || props.scene.navigationState.key === 'details');

		if (showHeader) {
			return (
				<NavigationHeader
				{...props}
				renderTitleComponent={this._renderTitleComponent.bind(this)}
				renderLeftComponent={this._renderLeftComponent.bind(this)}
				renderRightComponent={this._renderRightComponent.bind(this)}
				/>
			);
		}

		return null;
	}

	_renderTitleComponent(props) {
		return (
			<NavigationHeader.Title>
				{props.scene.navigationState.title}
			</NavigationHeader.Title>
		);
	}

	_renderLeftComponent(props) {
		if (props.scene.navigationState.showBackButton) {
			return (
				<NavigationHeaderBackButton onNavigate={this.props.onNavigate.bind(this)} />
			);
		}

		return null;
	}

	_renderRightComponent(props) {
		if (props.scene.navigationState.key === 'sectionsList') {
			return (
				<TouchableHighlight
					style={styles.buttonContainer}
					onPress={this._onAddItem.bind(this)}>
					<Image
						style={styles.button}
						source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}} />
				</TouchableHighlight>
			);
		}

		return null;
	}

	_renderScene(props) {
		if (props.scene.navigationState.key === 'sectionsList') {
			const marginTop = Platform.OS === 'ios' ? NavigationHeader.HEIGHT : 0;
			return (
				<View style={{ marginTop }}>
					<Items onSelectItem={this._onSelectItem.bind(this)} />
				</View>
			);
		}

		if (props.scene.navigationState.key === 'sectionDetails') {
			return (
				<View style={{ marginTop: NavigationHeader.HEIGHT }}>
					<ItemDetails />
				</View>
			);
		}
	}

	_onAddItem() {
		this.props.onNavigate({
			type: 'push',
			scope: 'global',
			route: {
				key: 'new',
				title: 'Main Screen',
				showBackButton: true
			}
		});
	}

	_onSelectItem() {
		this.props.onNavigate({
			type: 'push',
			route: {
				key: 'sectionDetails',
				title: 'Section details',
				showBackButton: true
			}
		});
	}
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch
	};
}

function mapStateToProps(state) {
	return {
		navigation: state.get('study')
	};
}

export default connect(mapStateToProps, mapDispatchToProps, (stateProps, dispatchProps, ownProps) => {
	return Object.assign({}, ownProps, stateProps, dispatchProps, {
		onNavigate: (action) => {
			dispatchProps.dispatch(Object.assign(action, {
				scope: action.scope || stateProps.navigation.key
			}));
		}
	});
})(StudyHome);
