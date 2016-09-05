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
		this._handleNavigate = this._handleNavigate.bind(this);
		this._renderScene = this._renderScene.bind(this);
		this._renderHeader = this._renderHeader.bind(this);

	  firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
		    // User signed in.
		    console.log(`Signed in as ${user.email}`);
				props.pushRoute(C.G_APPTABS);
		  } else {
		    // No user is signed in.
		    console.log(`Signed out`);
				props.popRoute();
		  }
		});
  }

	render() {
		return (
			<NavigationCardStack
				direction={'vertical'}
				navigationState={this.props.navigation}
				onNavigate={this._handleNavigate}
				renderScene={this._renderScene}
				renderOverlay={this._renderHeader}
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

	_handleNavigate(action) {
		switch (action && action.type) {
		case 'push':
			// does not appear to be used by anything
			// this.props.pushRoute(action.route);
			return true;
		case 'back':
		case 'pop':
			return this._handleBackAction();
		default:
			return false;
		}
	};
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
	return Object.assign({}, ownProps, stateProps, dispatchProps, {
    pushRoute: (route,data) => {
      dispatchProps.dispatch(Object.assign(push(route), {
        scope: stateProps.navigation.key,
      }));
    },
    popRoute: () => {
      dispatchProps.dispatch(Object.assign(pop(), {
        scope: stateProps.navigation.key,
      }));
    },
	});
})(GlobalNavigation);
