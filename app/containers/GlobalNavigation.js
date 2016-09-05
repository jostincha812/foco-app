import React from 'react';
import { View, NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

const { CardStack: NavigationCardStack } = NavigationExperimental;

import C from '../constants';
import { push } from '../actions/NavigationActions';
import styles from '../styles';
import AppTabs from './AppTabs';
import Tour from './Tour';

class GlobalNavigation extends React.Component {
	constructor(props) {
    super(props);

	  firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
		    // User signed in.
		    console.log(`Signed in as ${user.email}`);
				props.onNavigate(push(C.G_APPTABS));
		  } else {
		    // No user is signed in.
		    console.log(`Signed out`);
				props.onNavigate(pop());
		  }
		});
  }

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
		if (props.scene.navigationState.key === C.G_TOUR) {
			return (
					<Tour style={styles.navContainer} />
			);
		}

		if (props.scene.navigationState.key === C.G_APPTABS) {
			return (
				<AppTabs style={styles.navContainer} />
			);
		}
	}
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
