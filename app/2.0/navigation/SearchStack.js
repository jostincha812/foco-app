import React from 'react';
import { StackNavigator } from 'react-navigation';

import C from '../C';
import { navigationStyles } from '../styles/styles';

import I from '../components/Icons';
import SearchHome from '../containers/SearchHome';
import SearchResults from '../containers/SearchResults';

const STACK = {};
STACK[C.NAV_SEARCH_HOME] = { screen: SearchHome };
STACK[C.NAV_SEARCH_RESULTS] = { screen: SearchResults };

const SearchStack = StackNavigator(STACK, {
  navigationOptions: {
    header: navigationStyles.header,
    tabBar: ({ state, setParams }) => ({
      icon: ({ focused, tintColor }) => (
        I.search({ focused, tintColor })
      ),
    })
  }
});

export default SearchStack;
