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

export default AppTabsReducer = NavigationReducer.TabsReducer({
	key: 'apptabs',
	initialIndex: 0,
	tabReducers: tabs.map(t => (lastRoute) => lastRoute || t),
});
