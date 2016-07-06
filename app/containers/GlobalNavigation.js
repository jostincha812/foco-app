import React from 'react';
import { View, NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';

const { CardStack: NavigationCardStack } = NavigationExperimental;

import C from '../constants';
import styles from '../styles';
import AppTabs from './AppTabs';
// import Tour from './Tour';

class GlobalNavigation extends React.Component {
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
		if (props.scene.navigationState.key === 'tabs') {
			return (
				<View style={styles.navContainer}>
					<AppTabs />
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
	//
	// _onCloseNewItem() {
	// 	this.props.onNavigate({
	// 		type: 'BackAction'
	// 	});
	// }
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch
	};
}
function mapStateToProps(state) {
	return {
		// needs to be the same key as reducers.js
		navigation: state.get(C.S_GLOBAL_NAV)
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
