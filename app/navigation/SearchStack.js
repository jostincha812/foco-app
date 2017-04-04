import React from 'react';
import { StackNavigator } from 'react-navigation';

import N from './N';

import SearchHome from '../containers/SearchHome';
import SearchResults from '../containers/SearchResults';

const SearchStack = {};
SearchStack[N.NAV_SEARCH_HOME] = { screen: SearchHome };
SearchStack[N.NAV_SEARCH_RESULTS] = { screen: SearchResults };

export default StackNavigator(SearchStack);
