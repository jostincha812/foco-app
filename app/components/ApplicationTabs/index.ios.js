import React, { Component } from 'react';
import { View, Image, Text, NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons';
import TabNavigator from 'react-native-tab-navigator';

const { Reducer: NavigationReducer } = NavigationExperimental;
const { JumpToAction } = NavigationReducer.TabsReducer;

import C from '../../constants';
import styles from '../../styles';

// import Feed from '../Feed';

class ApplicationTabs extends Component {
	_renderTabContent(tab) {
		var s = "";
		switch (tab.key) {
			case 'study': s = 'book'; break;
			case 'practice': s = 'paper'; break;
			case 'mock': s = 'timer'; break;
			case 'progress': s = 'stats'; break;
			case 'profile': s = 'contact'; break;
			default:
				s = 'help';
		}
		return (
			<View style={[styles.container]} >
				<Text style={styles.title}>
					{s}
				</Text>
			</View>
		);
	}

	_tabIcon(tab, filled) {
		var s = 'help';

		switch (tab.key) {
			case 'study': s = 'book'; break;
			case 'practice': s = 'paper'; break;
			case 'mock': s = 'timer'; break;
			case 'progress': s = 'stats'; break;
			case 'profile': s = 'contact'; break;
			default:
				s = 'help';
		}

		// ios
		s = "ios-" + s + (filled?"":"-outline");
		// android
		// s = "md-" + s;
		console.log("icon=",s);

		return <Icon name={s} size={C.TAB_ICON_SIZE} style={filled? styles.tabIconSelected : styles.tabIcon} />;
	}

	render() {
		// renderSelectedIcon={() => this._tabIcon(tab,true)}
		const children = this.props.navigation.children.map( (tab, i) => {
			// renderIcon={() => this._tabIcon(tab,false)}
			// renderSelectedIcon={() => this._tabIcon(tab,true)}
			return (
				<TabNavigator.Item
						key={tab.key}
						title={tab.title}
						titleStyle={styles.tabTitle}
						selectedTitleStyle={styles.tabTitleSelected}
						onPress={
							() => this.props.onNavigate(JumpToAction(i))
						}
						selected={this.props.navigation.index === i}>
					{this._renderTabContent(tab)}
				</TabNavigator.Item>
			);
		});

		return (
			<TabNavigator style={styles.navContainer}>
				{children}
			</TabNavigator>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch
	};
}

function mapStateToProps(state) {
	return {
		navigation: state.get('tabs')
	};
}

export default connect(mapStateToProps, mapDispatchToProps, (stateProps, dispatchProps, ownProps) => {
	return Object.assign({}, ownProps, stateProps, dispatchProps, {
		onNavigate: (action) => {
			dispatchProps.dispatch(Object.assign(action, {
				scope: stateProps.navigation.key
			}));
		}
	});
})(ApplicationTabs);
