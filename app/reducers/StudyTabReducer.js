import ReactNative from 'react-native';
const { ListView, NavigationExperimental } = ReactNative;
const { Reducer: NavigationReducer } = NavigationExperimental;

// TODO remove
import sectionsData from '../data/SectionsData';
const dataSource = new ListView.DataSource({
	rowHasChanged: (row1, row2) => row1 !== row2,
});

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
		dataSource: dataSource.cloneWithRows(sectionsData),
	},
});

module.exports = (state, action) => {
	if (action.scope && action.scope !== 'study') {
		return state;
	} else {
		return studyNavigation(state, action);
	}
};
