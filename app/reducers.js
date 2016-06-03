import { combineReducers } from 'redux-immutable';

import globalNavigation from './components/GlobalNavigation/reducer';
import tabs from './components/ApplicationTabs/reducer';
// import feed from './components/Feed/reducer';

const applicationReducers = {
	globalNavigation: globalNavigation,
	tabs,
	// feed
};
export default function createReducer() {
	return combineReducers(applicationReducers);
}
