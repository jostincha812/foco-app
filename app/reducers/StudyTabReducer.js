import ReactNative from 'react-native';
const { NavigationExperimental } = ReactNative;
const { Reducer: NavigationReducer } = NavigationExperimental;

const studyNavigation = NavigationReducer.StackReducer({
	getPushedReducerForAction: (action) => {
		if (action.type === 'push') {
			return (state) => (state || action.route);
		}
		return null;
	},
	initialState: {
		key: 'study',
		index: 0,
		children: [
			{
				key: 'sections',
				title: 'Study'
			},
		],
	},
});

module.exports = (state, action) => {
	if (action.scope && action.scope !== 'study') {
		return state;
	} else {
		return studyNavigation(state, action);
	}
};
