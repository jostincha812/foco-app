import { ListView } from 'react-native';

import C from '../constants';
import sections from '../data/SectionsData';

const dataSource = new ListView.DataSource({
	rowHasChanged: (row1, row2) => row1 !== row2,
});

const initialState = {
  index: 0,
  key: 'study',
  children: [
    {
      key: C.STUDY_HOME,
      title: 'Study Home',
    },
  ],
	dataSource: dataSource.cloneWithRows(sections),
};
export default (state = initialState, action) => {
  const {
    index,
    children,
  } = state;

	switch (action.type) {
	  case C.PUSH_ROUTE:
	    return {
	      ...state,
	      children: [
	        ...children,
	        action.route,
	      ],
	      index: index + 1,
	    };
	  case C.POP_ROUTE:
	    return index > 0 ? {
	      ...state,
	      children: children.slice(0, children.length-1),
	      index: index - 1,
	    } : state;
	  default:
	    return state;
	}
};

//
// import ReactNative from 'react-native';
// const { ListView, NavigationExperimental } = ReactNative;
// const { Reducer: NavigationReducer } = NavigationExperimental;
//
// // TODO remove
// import sectionsData from '../data/SectionsData';
// const dataSource = new ListView.DataSource({
// 	rowHasChanged: (row1, row2) => row1 !== row2,
// });
//
// export default StudyTabReducer = NavigationReducer.StackReducer({
// 	getPushedReducerForAction: (action) => {
// 		if (action.type === 'push') {
// 			return (state) => (state || action.route);
// 		}
// 		return null;
// 	},
// 	initialState: {
// 		key: 'study',
// 		index: 0,
// 		children: [
// 			{
// 				key: 'sections',
// 				title: 'Study'
// 			},
// 		],
// 		dataSource: dataSource.cloneWithRows(sectionsData),
// 	},
// });
