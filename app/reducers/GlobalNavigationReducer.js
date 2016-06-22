/*
 *
 * GlobalNavigation reducer
 *
 */

import ReactNative from 'react-native';
const { NavigationExperimental } = ReactNative;
const { Reducer: NavigationReducer } = NavigationExperimental;

export default globalNavigation = NavigationReducer.StackReducer({
	getPushedReducerForAction: (action) => {
		if (action.type === 'push') {
			return (state) => (state || action.route);
		}
		return null;
	},
	initialState: {
		key: 'global',
		index: 0,
		children: [
			{
				key: 'tabs',
				index: 0
			},
		],
	},
});
