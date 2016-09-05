/*
 *
 * GlobalNavigation reducer
 *
 */

import ReactNative from 'react-native';
const { NavigationExperimental } = ReactNative;
const { Reducer: NavigationReducer } = NavigationExperimental;

import C from '../constants';

export default globalNavigationReducer = NavigationReducer.StackReducer({
	getPushedReducerForAction: (action) => {
		if (action.type === 'push') {
			return (state) => (state || action.route);
		}
		return null;
	},
	initialState: {
		key: C.S_GLOBAL_NAV,
		index: 0,
		children: [
			{
				key: C.G_TOUR,
				index: 0
			},
		],
	},
});
