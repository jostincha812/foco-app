import React from 'react';
import  { NavigationExperimental } from 'react-native';
const { Reducer: NavigationReducer } = NavigationExperimental;

import C from '../constants';

const tabs = [
	{ key: 'study', title: 'Study' },
	{ key: 'practice', title: 'Practice' },
	{ key: 'flashcardCreator', title: 'Flashcards' },
  { key: 'progress', title: 'My Progress' },
  { key: 'profile', title: 'My Profile' }
];
// { key: 'mock', title: 'Mock' },

export default AppTabsReducer = NavigationReducer.TabsReducer({
	key: C.S_APPTABS_NAV,
	initialIndex: 0,
	tabReducers: tabs.map(t => (lastRoute) => lastRoute || t),
});
