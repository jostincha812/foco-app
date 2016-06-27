import React from 'react';
import { Platform, BackAndroid, NavigationExperimental, View, Text } from 'react-native';
const { Header: NavigationHeader, CardStack: NavigationCardStack } = NavigationExperimental;
const NavigationHeaderBackButton = require('NavigationHeaderBackButton');

import C from '../constants';
import StudyHome from './StudyHome';
import SectionDetails from './SectionDetails';

export default class StudyTab extends React.Component {
	constructor(props) {
		super(props);
		this._renderScene = this._renderScene.bind(this);
		this._renderHeader = this._renderHeader.bind(this);
		this._renderTitleComponent = this._renderTitleComponent.bind(this);
		this._renderLeftComponent = this._renderLeftComponent.bind(this);
		this._renderRightComponent = this._renderRightComponent.bind(this);
		this._handleSelectSection = this._handleSelectSection.bind(this);
		this._handleSelectCardsDeck = this._handleSelectCardsDeck.bind(this);
		this._handleBackAction = this._handleBackAction.bind(this);
		this._handleNavigate = this._handleNavigate.bind(this);
	}
	componentDidMount() {
		BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction);
	}
	componentWillUnmount() {
		BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction);
	}

	render() {
		return (
			<NavigationCardStack
				direction='horizontal'
				navigationState={this.props.navigation}
				onNavigate={this._handleNavigate}
				renderScene={this._renderScene}
				renderOverlay={this._renderHeader}
				style={styles.main}
			/>
		);
	}

	_renderScene(props) {
		const { navigationState } = props.scene;
		const mt = Platform.OS === 'ios' ? NavigationHeader.HEIGHT : 0;
		const st = {marginTop:mt};

		// render your scene based on the route (navigationState)
		if (navigationState.key === C.STUDY_HOME) {
			return (
				<StudyHome style={st} onSelectItem={this._handleSelectSection} />
			);
		}

		if (navigationState.key === C.STUDY_SECTION) {
			const d = navigationState.data;
			return (
				<SectionDetails style={st} data={d} onSelectItem={this._handleSelectCardsDeck} />
			);
		}

		if (navigationState.key === C.STUDY_FLASHCARDS) {
		}
	};

	_renderHeader(props) {
		const showHeader = props.scene.navigationState.title &&
			(Platform.OS === 'ios');

		if (showHeader) {
			return (
				<NavigationHeader
					{...props}
					renderTitleComponent={this._renderTitleComponent}
					renderLeftComponent={this._renderLeftComponent}
					renderRightComponent={this._renderRightComponent}
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

	_renderLeftComponent({ scene }) {
		if (scene.navigationState.showBackButton) {
			return (
				<NavigationHeaderBackButton onNavigate={this._handleBackAction} />
			);
		}
		return null;
	}

	_renderRightComponent(props) {
		return null;
	}

	_handleSelectSection(data) {
		this.props.pushRoute(C.STUDY_SECTION, data);
	}

	_handleSelectCardsDeck() {

	}

	_handleBackAction() {
		if (this.props.navigation.index === 0) {
			return false;
		}
		this.props.popRoute();
		return true;
	};

	_handleNavigate(action) {
		switch (action && action.type) {
		case 'push':
			this.props.pushRoute(action.route);
			return true;
		case 'back':
		case 'pop':
			return this._handleBackAction();
		default:
			return false;
		}
	};
}
