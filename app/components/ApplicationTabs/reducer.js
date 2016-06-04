import React from 'react';
import  { NavigationExperimental } from 'react-native';
const { Reducer: NavigationReducer } = NavigationExperimental;

const tabs = [
	{ key: 'study', title: 'Study' },
	{ key: 'practice', title: 'Practice' },
	{ key: 'mock', title: 'Mock' },
  { key: 'progress', title: 'My Progress' },
  { key: 'profile', title: 'My Profile' }
];

const tabsNavigation = NavigationReducer.TabsReducer({
	key: 'tabs',
	initialIndex: 0,
	tabReducers: tabs.map(t => (lastRoute) => lastRoute || t),
});

module.exports = tabsNavigation;
