/*
 *
 * GlobalNavigation
 *
 */

import React, { Component } from 'react';
import { View, Text, NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';
const { CardStack: NavigationCardStack } = NavigationExperimental;

import styles from '../../styles';
import ApplicationTabs from '../ApplicationTabs';
// import Tour from '../Tour';

class GlobalNavigation extends Component {
	render() {
		return (
			<NavigationCardStack
				direction={'vertical'}
				navigationState={this.props.navigation}
				onNavigate={this.props.onNavigate}
				renderScene={this._renderScene.bind(this)}
				renderOverlay={this._renderHeader.bind(this)}
				style={styles.main}
			/>
		);
	}

	_renderHeader(props) {
		return null;
	}

	_renderScene(props) {
		if (props.scene.navigationState.key === 'applicationTabs') {
			return (
				<View style={styles.navContainer}>
					<ApplicationTabs />
				</View>
			);
		}

		// if (props.scene.navigationState.key === 'tour') {
		// 	return (
		// 		<View style={{flex: 1}}>
		// 			<Tour onClose={this._onCloseNewItem.bind(this)} />
		// 		</View>
		// 	);
		// }
	}

	_renderTitleComponent(props) {
		return null;
	}

	_onCloseNewItem() {
		this.props.onNavigate({
			type: 'BackAction'
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
		navigation: state.get('globalNavigation')
	};
}

export default connect(mapStateToProps, mapDispatchToProps, (stateProps, dispatchProps, ownProps) => {
	return Object.assign({}, dispatchProps, stateProps, {
		onNavigate: (action) => {
			dispatchProps.dispatch(
				Object.assign(action, {
					scope: stateProps.navigation.key
				})
			);
		}
	});
})(GlobalNavigation);
